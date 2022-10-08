const request = require('supertest')

const app = require('../src/app')
const knex = require('../src/db/connection')

describe('path /pizzas', () => {
	beforeAll(() => {
		return knex.migrate
			.forceFreeMigrationsLock()
			.then(() => knex.migrate.rollback(null, true))
			.then(() => knex.migrate.latest())
	})

	beforeEach(() => {
		return knex.seed.run()
	})

	afterAll(async () => {
		return knex.migrate.rollback(null, true).then(() => knex.destroy())
	})

	// TESTING FOR POST FUNCTIONS
	describe('POST /pizzas', () => {
		test('return 400 if name is missing', async () => {
			const data = {
				toppings: ['pepperoni', 'mushroom'],
			}
			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toContain('name')
			expect(response.status).toBe(400)
		})

		test('return 400 if toppings is missing', async () => {
			const data = {
				name: 'Green',
			}
			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toContain('toppings')
			expect(response.status).toBe(400)
		})

		test('returns 201 if data is valid', async () => {
			const data = {
				name: 'Green',
				toppings: ['pepperoni', 'mushroom'],
			}

			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toBeUndefined()
			expect(response.body.data.name).toBe('Green')
			expect(response.body.data.toppings).toContain('pepperoni')
			expect(response.body.data.toppings).toContain('mushroom')
			expect(response.status).toBe(201)
		})
	})
	// END OF TESTING FOR POST FUNCTIONS

	// TESTING FOR PUT FUNCTIONS
	describe('PUT /pizzas', () => {
		test('return 400 if name is missing', async () => {
			const data = {
				toppings: ['pepperoni', 'mushroom'],
			}
			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toContain('name')
			expect(response.status).toBe(400)
		})

		test('return 400 if toppings is missing', async () => {
			const data = {
				name: 'Green',
			}

			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toContain('toppings')
			expect(response.status).toBe(400)
		})

		test('returns 201 if data is valid', async () => {
			const expected = {
				name: 'Green',
				toppings: ['pepperoni', 'mushroom'],
			}

			const pizza = await knex('pizzas').where('pizza_id', 1).first()

			expect(pizza).not.toBeUndefined()

			Object.entries(expected).forEach(([key, value]) => (pizza[key] = value))

			const response = await request(app)
				.put('/pizzas/1')
				.set('Accept', 'application/json')
				.send({ data: pizza })

			expect(response.body.error).toBeUndefined()
			expect(response.body.data[0].name).toBe('Green')
			expect(response.body.data[0].toppings).toContain('pepperoni')
			expect(response.body.data[0].toppings).toContain('mushroom')
			expect(response.status).toBe(200)
		})
	})
	// END OF TESTING FOR PUT FUNCTIONS

	// TESTING FOR DELETE FUNCTIONS
	describe('DELETE /pizzas', () => {
		test('return 404 if pizza is non-existent', async () => {
			const response = await request(app)
				.delete('/pizzas/99')
				.set('Accept', 'application/json')
				.send({ datum: {} })

			expect(response.body.error).toContain('Pizza cannot be found.')
			expect(response.status).toBe(404)
		})

		test('return 200 if pizza is delete successfully', async () => {
			const data = {
				name: 'Green',
				toppings: ['pepperoni', 'mushroom'],
			}

			const makePizza = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({ data })

			expect(makePizza.body.error).toBeUndefined()
			expect(makePizza.status).toBe(201)

			const deletePizza = await request(app)
				.delete('/pizzas/4')
				.set('Accept', 'application/json')
				.send({ datum: {} })

			expect(deletePizza.body.error).toBeUndefined()
			expect(deletePizza.status).toBe(204)
		})
	})
	// END OF TESTING FOR DELETE FUNCTIONS
})
