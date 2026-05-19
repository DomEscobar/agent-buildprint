export default async function routes(fastify) {
  fastify.get('/', async () => [])
  fastify.post('/:id/upload', async () => ({ ok: true }))
}
