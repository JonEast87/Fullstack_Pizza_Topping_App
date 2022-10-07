const knex = require('../db/connection')

function list() {
	return knex('pizzas').select('*').orderBy('created_at')
}

function create(pizza) {
	return knex('pizzas')
		.insert(pizza)
		.returning('*')
		.then((data) => data[0])
}

function read(pizza_id) {
	return knex('pizzas')
		.where({ pizza_id })
		.then((result) => result[0])
}

function update(updatedPizza) {
	return knex('pizzas')
		.select('*')
		.where({ pizza_id: updatedPizza.pizza_id })
		.update(updatedPizza, '*')
}

function destroy(pizza_id) {
	return knex('pizzas').where({ pizza_id }).del()
}

module.exports = {
	list,
	create,
	read,
	update,
	delete: destroy,
}
