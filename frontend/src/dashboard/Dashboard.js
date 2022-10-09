import React, { useEffect, useState } from 'react'
import { listPizzas, listToppings } from '../utils/api'
import PizzasList from '../pizzas/list/PizzaList'
// import ToppingsList from '../pizzas/list/ToppingList'
import ErrorAlert from '../layout/ErrorAlert'

/**
 * Defines the dashboard page.
 * @param date
 * the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
	const [pizzas, setPizzas] = useState([])
	const [pizzasError, setPizzasError] = useState(null)

	const [toppings, setToppings] = useState([])
	const [toppingsError, setToppingsError] = useState(null)

	function loadPizza() {
		const abortController = new AbortController()
		setPizzasError(null)

		listPizzas(abortController.signal).then(setPizzas).catch(setPizzasError)
		return () => abortController.abort()
	}

	function loadToppings() {
		const abortController = new AbortController()
		setToppingsError(null)

		listToppings({}, abortController.signal)
			.then(setToppings)
			.catch(setToppingsError)
		return () => abortController.abort()
	}

	useEffect(loadPizza, [])
	useEffect(loadToppings, [])

	return (
		<main>
			<div className='row'>
				<div className='col-12 mx-auto my-3'></div>
			</div>
			<div className='row'>
				<div className='col-md-12 mx-auto'>
					<fieldset className='border border-bottom-0 border-dark p-3 m-0'>
						<legend className='pl-2 text-white shadow bg-dark rounded sticky-top'>
							Pizzas
						</legend>
						<PizzasList pizzas={pizzas} />
						<ErrorAlert error={pizzasError} />
					</fieldset>
				</div>
			</div>
			<div className='row mt-3'>
				<div className='col-md-12 mx-auto'>
					<fieldset className='border border-bottom-0 border-dark p-3 m-0'>
						<legend className='pl-2 text-white shadow bg-dark rounded sticky-top'>
							Toppings
						</legend>
						{/* <ToppingsList toppings={toppings} /> */}
						<ErrorAlert error={toppingsError} />
					</fieldset>
				</div>
			</div>
		</main>
	)
}

export default Dashboard
