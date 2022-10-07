const pizzas = require('./00-pizzas.json')

exports.seed = function (knex) {
	return knex
		.raw('TRUNCATE TABLE pizzas RESTART IDENTITY CASCADE')
		.then(() => knex('pizzas').insert(pizzas))
}
