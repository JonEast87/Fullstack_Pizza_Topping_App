const request = require('supertest')

const app = require('../src/app')
const knex = require('../src/db/connection')

describe('path /toppings', () => {
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
	describe('POST /toppings', () => {
		test('return 400 if topping is missing', async () => {
			const data = {}
			const response = await request(app)
				.post('/toppings')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toContain('topping')
			expect(response.status).toBe(400)
		})

		test('returns 201 if data is valid', async () => {
			const data = {
				topping: 'anchovy',
			}

			const response = await request(app)
				.post('/toppings')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toBeUndefined()
			expect(response.body.data.topping).toBe('anchovy')
			expect(response.status).toBe(201)
		})
	})
	// END OF TESTING FOR POST FUNCTIONS

	// TESTING FOR PUT FUNCTIONS
	describe('PUT /toppings', () => {
		test('return 400 if topping is missing', async () => {
			const data = {}

			const response = await request(app)
				.post('/toppings')
				.set('Accept', 'application/json')
				.send({ data })

			expect(response.body.error).toContain('topping')
			expect(response.status).toBe(400)
		})

		test('returns 201 if data is valid', async () => {
			const expected = {
				topping: 'anchovy',
			}

			const topping = await knex('toppings').where('topping_id', 1).first()

			expect(topping).not.toBeUndefined()

			Object.entries(expected).forEach(([key, value]) => (topping[key] = value))

			const response = await request(app)
				.put('/toppings/1')
				.set('Accept', 'application/json')
				.send({ data: topping })

			expect(response.body.error).toBeUndefined()
			expect(response.body.data[0].topping).toBe('anchovy')
			expect(response.status).toBe(200)
		})
	})
	// END OF TESTING FOR PUT FUNCTIONS

	// TESTING FOR DELETE FUNCTIONS
	describe('DELETE /toppings', () => {
		test('return 404 if topping is non-existent', async () => {
			const response = await request(app)
				.delete('/toppings/99')
				.set('Accept', 'application/json')
				.send({ datum: {} })

			expect(response.body.error).toContain('topping cannot be found.')
			expect(response.status).toBe(404)
		})

		test('return 200 if topping is delete successfully', async () => {
			const data = {
				topping: 'anchovy',
			}

			const makeTopping = await request(app)
				.post('/toppings')
				.set('Accept', 'application/json')
				.send({ data })

			expect(makeTopping.body.error).toBeUndefined()
			expect(makeTopping.status).toBe(201)

			const deleteTopping = await request(app)
				.delete('/toppings/4')
				.set('Accept', 'application/json')
				.send({ datum: {} })

			expect(deleteTopping.body.error).toBeUndefined()
			expect(deleteTopping.status).toBe(204)
		})
	})
	// END OF TESTING FOR DELETE FUNCTIONS
})
