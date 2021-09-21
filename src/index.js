const build = require('./app')
const database = require('./database')

build({ machine: database() }).listen(3000)
