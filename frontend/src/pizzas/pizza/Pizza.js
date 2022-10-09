import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Buttons from '../../layout/Button'
import { deletePizza } from '../../utils/api'
import ErrorAlert from '../../layout/ErrorAlert'

function Pizza(pizza) {
	const { pizza_id, name, toppings } = pizza.pizzas
	const history = useHistory()

	const [deletePizzaError, setDeletePizzaError] = useState(null)

	const confirmCancel = () => {
		if (
			window.confirm(
				'Do you want to delete this topping? This cannot be undone.'
			)
		) {
			const abortController = new AbortController()
			setDeletePizzaError(null)

			deletePizza(pizza_id, abortController.signal)
				.then(() => history.go(0))
				.catch(setDeletePizzaError)

			return () => abortController.abort()
		}
	}

	const buttons = (
		<div className={'bg-light'}>
			<Buttons confirmCancel={confirmCancel} id={pizza_id} name={'pizzas'} />
		</div>
	)

	return (
		<section
			className='card h-100 m-0 mx-2 text-left'
			style={{ maxWidth: '100%' }}>
			<div className='card-footer'>
				<p className='card-text mt-2 mb-1'>Pizza: {name}</p>
				<p className='card-text mt-2 mb-1'>Toppings: {toppings}</p>
			</div>
			{buttons}
			<ErrorAlert error={deletePizzaError} />
		</section>
	)
}

export default Pizza
