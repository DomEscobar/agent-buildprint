export async function POST(){ const s = process.env.STRIPE_WEBHOOK_SECRET; return Response.json({ ok: Boolean(s) }); }
