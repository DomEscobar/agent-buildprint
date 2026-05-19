import { auth } from '../../auth/session';
import { db } from '../../models/db';

export async function DELETE(request: Request) {
  const session = await auth(request);
  if (!session?.user?.roles?.includes('owner')) return Response.json({ error: 'forbidden' }, { status: 403 });
  const { userId } = await request.json();
  await db.auditLog.create({ action: 'admin.user.delete', actorId: session.user.id, targetId: userId });
  await db.user.update({ where: { id: userId }, data: { disabled: true } });
  return Response.json({ ok: true });
}
