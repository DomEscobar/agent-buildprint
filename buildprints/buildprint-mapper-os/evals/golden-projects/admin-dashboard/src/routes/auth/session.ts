export async function auth(_request: Request) {
  return { user: { id: 'admin_1', roles: ['owner'] } };
}
