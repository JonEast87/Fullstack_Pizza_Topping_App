const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const express = require('express')
const cors = require('cors')

const notFound = require('./errors/notFound')
const errorHandler = require('./errors/errorHandler')
const pizzasRouter = require('./pizzas/pizzas.router')
const toppingsRouter = require('./toppings/toppings.router')

const app = express()

app.use(cors())
app.use(express.json())
app.options('*', cors())

app.use('/pizzas', pizzasRouter)
app.use('/toppings', toppingsRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
