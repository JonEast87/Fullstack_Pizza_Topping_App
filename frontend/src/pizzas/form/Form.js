import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { createPizza, updatePizza, listToppings } from '../../utils/api'
import ErrorAlert from '../../layout/ErrorAlert'

/**
 * Defines the topping form
 * @param method
 * method assigns the http protocol that is being called for the form
 */

function Form({ method }) {
	const { pizza_id } = useParams()
	const [pizzaError, setPizzaError] = useState(null)

	const [toppings, setToppings] = useState([])
	const [toppingsError, setToppingsError] = useState(null)

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
	}, [pizza_id, method])

	const handleChange = ({ target }) => {
		setPizza({
			...pizza,
			[target.name]: [...pizza.toppings, target.id],
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

		updatePizza(pizza_id, pizzaData, abortController.signal)
			.then(() => history.push(`/dashboard`))
			.catch(setPizzaError)
	}

	function loadToppings() {
		const abortController = new AbortController()
		setToppingsError(null)

		listToppings({}, abortController.signal)
			.then(setToppings)
			.catch(setToppingsError)
		return () => abortController.abort()
	}

	function toppingSelection(toppings) {
		const toppingArray = []

		toppings.forEach((topping) => {
			toppingArray.push(topping)
		})

		const toppingList = toppingArray.map((topping, index) => (
			<div className='form-check' key={index}>
				<input
					id={topping.topping}
					type='checkbox'
					name='toppings'
					className='form-check-input'
					onChange={handleChange}
					multiple
				/>
				<label className='form-check-label' htmlFor='toppings'>
					{topping.topping}
				</label>
			</div>
		))

		return toppingList
	}

	const handleCancel = (event) => {
		event.preventDefault()
		history.goBack()
	}

	useEffect(loadToppings, [])

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<div className='form-group'>
					{toppingSelection(toppings)}

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
				<ErrorAlert error={toppingsError} />
			</fieldset>
		</form>
	)
}

export default Form
