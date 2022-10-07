const service = require('./pizza.service')

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

async function list(req, res) {
	const pizzas = await service.list()
	res.locals.data = pizzas
	const { data } = res.locals
	res.json({ data: data })
}

async function create(req, res) {
	const data = await service.create(req.body)
	res.status(201).json({ data })
}

async function update(req, res, next) {
	const updatedPizza = {
		...req.body,
		pizza_id: res.locals.pizza.pizza_id,
	}

	service
		.update(updatedPizza)
		.then((data) => res.json({ data }))
		.catch(next)
}

async function destroy(req, res, next) {
	// console.log(res.locals.pizza)
	service
		.delete(res.locals.pizza.pizza_id)
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	list,
	create,
	update: [pizzaExists, update],
	delete: [pizzaExists, destroy],
}
