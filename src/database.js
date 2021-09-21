module.exports = () => {
  const _beverages = {
    a: 5,
    b: 5,
    c: 5,
  }
  let _coins = 0

  return {
    beverages() {
      return _beverages
    },
    coins() {
      return _coins
    },
    deposit(coins) {
      console.log({ coins })
      _coins += parseInt(coins, 10)
    },
    haveEnoughMoney() {
      return _coins >= 2
    },
    refund() {
      const returned = _coins
      _coins = 0
      return returned
    },
    purchase(name) {
      let purchased = 0
      while (_coins >= 0) {
        if (!this.isAvailable(name)) {
          return purchased
        }
        _beverages[name] -= 1
        _coins -= 2
        purchased += 1
      }

      return purchased
    },
    isAvailable(name) {
      return _beverages[name] > 0
    },
    remaining(id) {
      return _beverages[id]
    },
  }
}
