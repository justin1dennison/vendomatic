const test = require("ava");
const build = require("./src/app");
const database = require("./src/database");

test("can deposit coins", async (t) => {
  const app = build({ machine: database() });
  let response = await app.inject().put("/").body({ coin: 1 });

  let coins = response.headers["x-coins"];
  t.is(response.statusCode, 204);
  t.is(coins, 1);

  response = await app.inject().put("/").body({ coin: 2 });
  coins = response.headers["x-coins"];
  t.is(response.statusCode, 204);
  t.is(coins, 3);

  await app.close();
});

test("can refund coins", async (t) => {
  const app = build({ machine: database() });

  t.pass();
  await app.close();
});

test("can report the inventory", async (t) => {
  const app = build({ machine: database() });
  const response = await app.inject().get("/inventory");

  t.is(response.statusCode, 200);
  t.deepEqual(response.json(), [5, 5, 5]);

  await app.close();
});

test("can report the inventory of a single item", async (t) => {
  const app = build({ machine: database() });
  const id = 2
  const url = `/inventory/${id}`  
  const response = await app.inject().get(url);

  t.is(response.statusCode, 200);
  t.is(response.headers['x-coins'], 5);

  await app.close();

});

test("can make purchase", async (t) => {
  const app = build({ machine: database() });

  t.pass();

  await app.close();
});

test("cannot make a purchase without enough money", async (t) => {
  const app = build({ machine: database() });

  t.pass();

  await app.close();
});

test("cannot make a purchase if out of stock", async (t) => {
  const app = build({ machine: database() });

  t.pass();

  await app.close();
});
