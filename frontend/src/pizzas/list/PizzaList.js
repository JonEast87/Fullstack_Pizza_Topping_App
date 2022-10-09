import React from 'react'
import Pizza from '../pizza/Pizza'

function PizzaList({ pizzas }) {
	const pizzaArray = []

	pizzas.forEach((pizza) => {
		pizzaArray.push(pizza)
	})

	const pizzaList = pizzaArray.map((pizza, index) => (
		<div className='col mb-4' key={index}>
			<div className={'card h-100 text-center'} key={index}>
				<Pizza pizzas={pizza} />
			</div>
		</div>
	))

	return (
		<div className='row row-cols-1 row-cols-md-3'>
			{pizzaList ?? '(... pizzas)'}
		</div>
	)
}

export default PizzaList
