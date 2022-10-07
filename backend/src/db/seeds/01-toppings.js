const toppings = require('./01-toppings.json')

exports.seed = function (knex) {
	return knex
		.raw('TRUNCATE TABLE toppings RESTART IDENTITY CASCADE')
		.then(() => knex('toppings').insert(toppings))
}
