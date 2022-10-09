import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { createPizza, updatePizza } from '../../utils/api'
import ErrorAlert from '../../layout/ErrorAlert'

/**
 * Defines the topping form
 * @param method
 * method assigns the http protocol that is being called for the form
 */

function Form({ method }) {
	const { topping_id } = useParams()
	const [pizzaError, setPizzaError] = useState(null)
	const history = useHistory()

	const initialState = {
		toppings: [],
	}

	const [pizza, setPizza] = useState({ ...initialState })

	useEffect(() => {
		if (method === 'POST') return

		const abortController = new AbortController()
		setPizzaError(null)

		return () => abortController.abort()
	}, [topping_id, method])

	const handleChange = ({ target }) => {
		let value = target.value

		if (target.toppings === 'toppings' && typeof value === 'string') {
			value = +value
		}

		setPizza({
			...pizza,
			[target.name]: value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		method === 'POST' ? submitNew() : submitEdit()
	}

	const submitNew = () => {
		const abortController = new AbortController()
		setPizzaError(null)

		createPizza(pizza, abortController.signal)
			.then(() => history.push(`/dashboard`))
			.catch(setPizzaError)
	}

	const submitEdit = () => {
		const abortController = new AbortController()
		setPizzaError(null)

		const pizzaData = {
			toppings: pizza.toppings,
		}

		updatePizza(topping_id, pizzaData.toppings, abortController.signal)
			.then(() => history.push(`/dashboard`))
			.catch(setPizzaError)
	}

	const handleCancel = (event) => {
		event.preventDefault()
		history.goBack()
	}

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='topping'>Edit Pizza Toppings</label>
					<input
						id='topping'
						type='text'
						name='topping'
						className='form-control'
						onChange={handleChange}
						value={pizza.toppings}
						required={true}
					/>

					<button
						type='button'
						className='btn btn-secondary mr-2'
						onClick={handleCancel}>
						<span className='oi oi-x'>Cancel</span>
					</button>

					<button type='submit' className='btn btn-primary'>
						<span className='oi oi-check'>Submit</span>
					</button>
				</div>
				<ErrorAlert error={pizzaError} />
			</fieldset>
		</form>
	)
}

export default Form
