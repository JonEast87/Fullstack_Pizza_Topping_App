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

			console.log(response.body.data[0].toppings)
			expect(response.body.error).toBeUndefined()
			expect(response.body.data[0].name).toBe('Green')
			expect(response.body.data[0].toppings).toContain('pepperoni')
			expect(response.body.data[0].toppings).toContain('mushroom')
			expect(response.status).toBe(200)
		})
	})
})
