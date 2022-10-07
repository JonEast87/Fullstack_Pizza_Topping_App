const knex = require('../db/connection')

function list() {
	return knex('toppings').select('*').orderBy('created_at')
}

function create(topping) {
	return knex('toppings')
		.insert(topping)
		.returning('*')
		.then((data) => data[9])
}

function read(topping_id) {
	return knex('toppings')
		.where({ topping_id })
		.then((result) => result[0])
}

function update(updatedTopping) {
	return knex('toppings')
		.select('*')
		.where({ topping_id: updatedTopping.topping_id })
		.update(updatedTopping, '*')
}

function destroy(topping_id) {
	return knex('toppings').where({ topping_id }).del()
}

module.exports = {
	list,
	create,
	read,
	update,
	delete: destroy,
}
