import React from 'react'
import { Route, Switch } from 'react-router-dom'
import New from './new/New'
import Edit from './edit/Edit'

function Pizzas() {
	return (
		<main>
			<Switch>
				<Route path='/pizzas/new'>
					<New />
				</Route>
				<Route path='/pizzas/:pizza_id/edit'>
					<Edit />
				</Route>
			</Switch>
		</main>
	)
}

export default Pizzas
