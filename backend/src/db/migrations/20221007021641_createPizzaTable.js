/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('pizzas', (table) => {
		table.increments('pizza_id').primary()
		table
			.foreign('topping_id')
			.references('topping_id')
			.inTable('toppings')
			.onDelete('cascade')
		table.text('toppings').unique()
		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('pizzas')
}
