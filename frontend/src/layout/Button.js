import React from 'react'

/**
 * Defines the toolbar of buttons on a reservation card
 */

function Button({ confirmCancel, id, name }) {
	return (
		<div
			className='btn-toolbar justify-content-between'
			role='toolbar'
			aria-label='pizza-topping actions'>
			<div
				className='btn-group-sm'
				role='group'
				aria-label='Modify Pizza or Toppings'>
				<a href={`/${name}/${id}/edit`} className='btn btn-secondary mr-2'>
					Edit
				</a>
				<button
					className='btn btn-danger'
					onClick={confirmCancel}
					data-reservation-id-cancel={id}>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default Button
