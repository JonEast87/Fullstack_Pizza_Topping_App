import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { createTopping, readTopping, updateTopping } from '../../utils/api'
import ErrorAlert from '../../layout/ErrorAlert'

/**
 * Defines the topping form
 * @param method
 * method assigns the http protocol that is being called for the form
 */

function Form({ method }) {
	const { topping_id } = useParams()
	const [toppingError, setToppingError] = useState(null)
	const history = useHistory()

	const initialState = {
		topping: '',
	}

	const [topping, setTopping] = useState({ ...initialState })

	useEffect(() => {
		if (method === 'POST') return

		const abortController = new AbortController()
		setToppingError(null)

		readTopping(topping_id, abortController.signal)
			.then(setTopping)
			.catch(setToppingError)

		return () => abortController.abort()
	}, [topping_id, method])

	const handleChange = ({ target }) => {
		let value = target.value

		if (target.name === 'topping' && typeof value === 'string') {
			value = +value
		}

		setTopping({
			...topping,
			[target.name]: value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		method === 'POST' ? submitNew() : submitEdit()
	}

	const submitNew = () => {
		const abortController = new AbortController()
		setToppingError(null)

		createTopping(topping, abortController.signal)
			.then(() => history.push(`/dashboard`))
			.catch(setToppingError)
	}

	const submitEdit = () => {
		const abortController = new AbortController()
		setToppingError(null)

		const toppingData = {
			topping: topping.name,
		}

		updateTopping(topping_id, toppingData, abortController.signal)
			.then(() => history.push(`/dashboard`))
			.catch(setToppingError)
	}

	const handleCancel = (event) => {
		event.preventDefault()
		history.goBack()
	}

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='toppingName'>Topping</label>
					<input
						id='toppingName'
						type='text'
						name='toppingName'
						className='form-control'
						onChange={handleChange}
						value={topping.name}
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
				<ErrorAlert error={toppingError} />
			</fieldset>
		</form>
	)
}

export default Form
