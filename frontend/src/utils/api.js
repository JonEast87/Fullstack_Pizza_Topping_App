/**
 * Defines the base url for the API.
 * The default values are overriden by the `API_BASE_URL` environment variable
 */

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

/**
 * Defines the default headers for these function to work with `json-server`
 */
const headers = new Headers()
headers.append('Content-Type', 'application/json')

/**
 * Fetch `json` from the specificed URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 * the url for the result
 * @param options
 * any options for fetch
 * @param onCancel
 * value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 * a promise that resolves to the `json` data or an error.
 * If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
	try {
		const response = await fetch(url, options)

		if (response.status === 204) {
			return null
		}

		const payload = await response.json()

		if (payload.error) {
			return Promise.reject({ message: payload.error })
		}
		return payload.data
	} catch (error) {
		if (error.name !== 'AbortError') {
			console.error(error.stack)
			throw error
		}
		return Promise.resolve(onCancel)
	}
}

/**
 * Retrieves all existing pizzas
 * @returns {Promise<[pizza]>}
 * a promise that resolves to a possibly empty array of pizza saved in the database
 */
export async function listPizzas(params, signal) {
	const url = new URL(`${API_BASE_URL}/pizzas`)
	Object.entries(params).forEach(([key, value]) =>
		url.searchParams.append(key, value.toString())
	)
	return await fetchJson(url, { headers, signal }, [])
}

/**
 * Retrieves all existing toppings
 * @returns {Promise<[topping]>}
 * a promise that resolves to a possibly empty array of topping saved in the database
 */
export async function listToppings(params, signal) {
	const url = new URL(`${API_BASE_URL}/toppings`)
	Object.entries(params).forEach(([key, value]) =>
		url.searchParams.append(key, value.toString())
	)
	return await fetchJson(url, { headers, signal }, [])
}

/**
 * Creates a new pizza
 * @return {Promise<{pizza}>}
 * a promise that resolves to a new object of pizza saved in the database
 */
export async function createPizza(pizzaDetails, signal) {
	const url = new URL(`${API_BASE_URL}/pizzas`)
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify({ data: pizzaDetails }),
		signal,
	}
	return await fetchJson(url, options)
}

/**
 * Creates a new topping
 * @returns {Promise<{topping}>}
 * a promise that resolves to a new object of topping saved in the database
 */
export async function createTopping(toppingDetails, signal) {
	const url = new URL(`${API_BASE_URL}/toppings`)
	const options = {
		method: 'POST',
		headers,
		body: JSON.stringify({ data: toppingDetails }),
		signal,
	}
	return await fetchJson(url, options)
}

/**
 * Reads an existing pizza
 * @returns {Promise<{pizza}>}
 * a promise that resolves to an existing object saved in the database
 */
export async function readPizza(id, signal) {
	const url = new URL(`${API_BASE_URL}/pizza/${id}`)
	return await fetchJson(url, { headers, signal }, [])
}

/**
 * Reads an existing topping
 * @returns {Promise<{topping}>}
 * a promise that resolves to an existing object saved in the database
 */
export async function readTopping(id, signal) {
	const url = new URL(`${API_BASE_URL}/topping/${id}`)
	return await fetchJson(url, { headers, signal }, [])
}

/**
 * Updates an existing pizza
 * @returns {Promise<{pizza}>}
 * a promise that resolves to an updated object of pizza saved in the database
 */
export async function updatePizza(pizza_id, newToppings, signal) {
	const url = new URL(`${API_BASE_URL}/pizzas/${pizza_id}`)
	const options = {
		method: 'PUT',
		headers,
		body: JSON.stringify({ data: newToppings }),
		signal,
	}
	return await fetchJson(url, options)
}

/**
 * Updates an existing topping
 * @returns {Promise<{topping}>}
 * a promise that resolves to an updated object of topping saved in the database
 */
export async function updateTopping(topping_id, newTopping, signal) {
	const url = new URL(`${API_BASE_URL}/toppings/${topping_id}/topping`)
	const options = {
		method: 'PUT',
		headers,
		body: JSON.stringify({ data: { topping: newTopping } }),
		signal,
	}
	return await fetchJson(url, options)
}
