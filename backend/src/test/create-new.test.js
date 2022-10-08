const request = require('supertest')

const app = require('../app')
const knex = require('../db/connection')

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

	describe('POST /pizzas', () => {
		test('return 400 if name is missing', async () => {
			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({
					toppings: ['pepperoni', 'mushroom'],
				})

			expect(response.body.error).toContain('name')
			expect(response.status).toBe(400)
		})

		test('return 400 if toppings is missing', async () => {
			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({
					name: 'Green',
				})

			expect(response.body.error).toContain('toppings')
			expect(response.status).toBe(400)
		})

		test('returns 201 if data is valid', async () => {
			const response = await request(app)
				.post('/pizzas')
				.set('Accept', 'application/json')
				.send({
					name: 'Green',
					toppings: ['pepperoni', 'mushroom'],
				})

			expect(response.body.error).toBeUndefined()
			expect(response.body.data).toEqual(
				expect.objectContaining({
					name: 'Green',
					toppings: ['pepperoni', 'mushroom'],
				})
			)
			expect(response.status).toBe(201)
		})
	})
})
