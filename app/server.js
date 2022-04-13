const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))

app.use(bodyParser.json())

require('./routes/user.routes')(app)
require('./routes/location.routes')(app)

const config = require('./configs/config.js')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.mongodbUrl).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

const server = app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`)
})

require('./ws/ws.server').startWebSocket(server);