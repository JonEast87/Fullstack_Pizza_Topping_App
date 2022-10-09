import React from 'react'
import { Route, Switch } from 'react-router-dom'

function Toppings() {
	return (
		<main>
			<Switch>
				<Route path='/toppings/new'></Route>
			</Switch>
		</main>
	)
}

export default Toppings
