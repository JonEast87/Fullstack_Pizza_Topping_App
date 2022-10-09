import React from 'react'
import { Route, Switch } from 'react-router-dom'

function Pizzas() {
	return (
		<main>
			<Switch>
				<Route path='/pizzas/new'></Route>
			</Switch>
		</main>
	)
}

export default Pizzas
