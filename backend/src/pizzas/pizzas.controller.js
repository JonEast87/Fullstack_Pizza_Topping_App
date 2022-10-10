const service = require('./pizza.service')
const hasProperties = require('../errors/hasProperties')

const REQUIRED_PROPERTIES = ['toppings']
const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES)

function pizzaExists(req, res, next) {
	service
		.read(req.params.pizza_id)
		.then((pizza) => {
			if (pizza) {
				res.locals.pizza = pizza
				return next()
			}
			next({ status: 404, message: `Pizza cannot be found.` })
		})
		.catch(next)
}

async function list(req, res, next) {
	service
		.list()
		.then((data) => res.json({ data }))
		.catch(next)
}

async function read(req, res) {
	const { pizza } = res.locals
	res.json({ data: pizza })
}

async function create(req, res) {
	const data = await service.create(req.body.data)
	res.status(201).json({ data })
}

async function update(req, res, next) {
	const updatedPizza = {
		...req.body.data,
		pizza_id: res.locals.pizza.pizza_id,
	}

	service
		.update(updatedPizza)
		.then((data) => res.json({ data }))
		.catch(next)
}

async function destroy(req, res, next) {
	service
		.delete(res.locals.pizza.pizza_id)
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	list,
	create: [hasRequiredProperties, create],
	read: [pizzaExists, read],
	update: [pizzaExists, hasRequiredProperties, update],
	delete: [pizzaExists, destroy],
}
