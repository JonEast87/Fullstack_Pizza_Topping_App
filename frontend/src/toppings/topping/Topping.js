import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Buttons from '../../layout/Button'
import { deleteTopping } from '../../utils/api'
import ErrorAlert from '../../layout/ErrorAlert'

function Topping(toppings) {
	const { topping_id, topping } = toppings.topping
	const history = useHistory()

	const [deleteToppingError, setDeleteToppingError] = useState(null)

	const confirmCancel = () => {
		if (
			window.confirm(
				'Do you want to delete this topping? This cannot be undone.'
			)
		) {
			const abortController = new AbortController()
			setDeleteToppingError(null)

			deleteTopping(topping_id, abortController.signal)
				.then(() => history.go(0))
				.catch(setDeleteToppingError)

			return () => abortController.abort()
		}
	}

	const buttons = (
		<div className={'bg-light'}>
			<Buttons
				confirmCancel={confirmCancel}
				id={topping_id}
				name={'toppings'}
			/>
		</div>
	)

	return (
		<section
			className='card h-100 m-0 mx-2 text-left'
			style={{ maxWidth: '100%' }}>
			<div className='card-footer'>
				<p className='card-text mt-2 mb-1'>Topping: {topping}</p>
			</div>
			{buttons}
			<ErrorAlert error={deleteToppingError} />
		</section>
	)
}

export default Topping
