import React from 'react'

function Pizza(pizza) {
	const { pizza_id, name, toppings } = pizza.pizzas

	return (
		<section
			className='card h-100 m-0 mx-2 text-left'
			style={{ maxWidth: '100%' }}>
			<div className='card-footer'>
				<p className='card-text mt-2 mb-1'>Pizza: {name}</p>
				<p className='card-text mt-2 mb-1'>Toppings: {toppings}</p>
			</div>
		</section>
	)
}

export default Pizza
