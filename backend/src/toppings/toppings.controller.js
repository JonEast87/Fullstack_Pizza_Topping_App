const service = require('./toppings.service')
const hasProperties = require('../errors/hasProperties')

const REQUIRED_PROPERTIES = ['topping']
const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES)

function toppingExists(req, res, next) {
	service
		.read(req.params.topping_id)
		.then((topping) => {
			if (topping) {
				res.locals.topping = topping
				return next()
			}
			next({ status: 404, message: `topping cannot be found.` })
		})
		.catch(next)
}

async function list(req, res, next) {
	service
		.list()
		.then((data) => res.json({ data }))
		.catch(next)
}

async function create(req, res, next) {
	const data = req.body.data

	service
		.create(data)
		.then((data) => res.status(201).json({ data }))
		.catch(next)
}

async function read(req, res) {
	const { topping } = res.locals
	res.json({ data: topping })
}

async function update(req, res, next) {
	const updatedTopping = {
		...req.body.data,
		topping_id: res.locals.topping.topping_id,
	}
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
	create: [hasRequiredProperties, create],
	read: [toppingExists, read],
	update: [toppingExists, hasRequiredProperties, update],
	delete: [toppingExists, destroy],
}
