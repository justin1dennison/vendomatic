const test = require('ava')
const build = require('./src/app')
const database = require('./src/database')

test('can deposit coins', async (t) => {
  const app = build({ machine: database() })
  let response = await app.inject().put('/').body({ coin: 1 })
  t.is(response.statusCode, 204)
  t.truthy(response.headers)

  response = await app.inject().put('/').body({ coin: 2 })
  t.is(response.statusCode, 204)
  t.truthy(response.headers)

  await app.close()
})

test('can refund coins', (t) => {
  const app = build({ machine: database() })

  t.fail()
  await app.close()

})

test('can report the inventory', (t) => {
const app = build({ machine: database() })

  t.fail()
  await app.close()

})

test('can report the inventory of a single item', (t) => {
  const app = build({ machine: database() })

  t.fail()
  await app.close()

})

test('can make purchase', (t) => {
  const app = build({ machine: database() })

  t.fail()

  await app.close()
})

test('cannot make a purchase without enough money', (t) => {
  const app = build({ machine: database() })

  t.fail()

  await app.close()

})

test('cannot make a purchase if out of stock', (t) => {
  const app = build({ machine: database() })

  t.fail()

  await app.close()

})