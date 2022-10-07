const service = require('./toppings.service')

function toppingExists(req, res, next) {
	service
		.read(req.params.topping_id)
		.then((topping) => {
			if (topping) {
				res.locals.topping = topping
				return next()
			}
			next({ status: 404, message: `Topping cannot be found.` })
		})
		.catch(next)
}

async function list(req, res) {
	const toppings = await service.list()
	res.locals.data = toppings
	const { data } = res.locals
	res.json({ data: data })
}

async function create(req, res) {
	const data = await service.create(req.body)
	res.status(201).json({ data })
}

async function update(req, res, next) {
	const updatedTopping = {
		...req.body,
		topping_id: res.locals.topping.topping_id,
	}
	console.log(updatedTopping)
	service
		.update(updatedTopping)
		.then((data) => res.json({ data }))
		.catch(next)
}

async function destroy(req, res, next) {
	service
		.delete(res.locals.topping.topping_id)
		.then(() => res.sendStatus(204))
		.catch(next)
}

module.exports = {
	list,
	create,
	update: [toppingExists, update],
	delete: [toppingExists, destroy],
}
