import React from 'react'
import Topping from '../topping/Topping'

function ToppingList({ toppings }) {
	const toppingArray = []

	toppings.forEach((topping) => {
		toppingArray.push(topping)
	})

	const toppingList = toppingArray.map((topping, index) => (
		<div className='col mb-4' key={index}>
			<div className={'card h-100 text-center'} key={index}>
				<Topping topping={topping} />
			</div>
		</div>
	))

	return (
		<div className='row row-cols-1 row-cols-md-3'>
			{toppingList ?? '(... toppings)'}
		</div>
	)
}

export default ToppingList
