const fastify = require('fastify')

module.exports = build

function build({ machine }) {
  const app = fastify({
    logger:
      process.env.NODE_ENV !== 'development' ||
      process.env.NODE_ENV !== 'testing',
  })

  app.put('/', {}, async (request, reply) => {
    const { coin } = request.body
    machine.deposit(parseInt(coin, 10))
    const coins = machine.coins()
    await reply.code(204).headers({ 'X-Coins': coins }).send()
  })
  app.delete('/', {}, async (request, reply) => {
    const coins = machine.coins()
    await reply.code(204).header('X-Coins', coins)
  })
  app.get('/inventory', {}, async (request, reply) => {
    const remaining = Object.values(machine.beverages())
    await reply.code(200).send(remaining)
  })

  app.get('/inventory/:id', {}, async (request, reply) => {
    const { id } = request.params
    const quantity = machine.remaining(id)
    await reply
      .code(200)
      .headers({
        'X-Coins': machine.refund(),
        'X-Inventory-Remaining': machine.remaining(id),
      })
      .send({
        quantity,
      })
  })

  app.put(
    '/inventory/:id',
    { onRequest: [verifyStock, verifyCashSufficient] },
    async (request, reply) => {
      const { id } = request.params
      const quantity = machine.purchase(id)
      await reply
        .code(200)
        .headers({
          'X-Coins': machine.refund(),
          'X-Inventory-Remaining': machine.remaining(id),
        })
        .send({
          quantity,
        })
    },
  )
  return app

  async function verifyStock(request, reply) {
    const { id } = request.params
    if (!app.machine.isAvailable(id))
      reply.code(404).headers({ 'X-Coins': machine.coins() }).send()
  }
  async function verifyCashSufficient(request, reply) {
    if (!app.machine.haveEnoughMoney())
      return reply
        .code(403)
        .headers({ 'X-Coins': Math.abs(2 - machine.coins()) })
        .send()
  }
}
