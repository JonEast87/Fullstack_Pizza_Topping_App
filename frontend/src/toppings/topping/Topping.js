import React from 'react'

function Topping(toppings) {
	console.log(toppings)
	const { topping } = toppings.topping
	return (
		<section
			className='card h-100 m-0 mx-2 text-left'
			style={{ maxWidth: '100%' }}>
			<div className='card-footer'>
				<p className='card-text mt-2 mb-1'>Topping: {topping}</p>
			</div>
		</section>
	)
}

export default Topping
