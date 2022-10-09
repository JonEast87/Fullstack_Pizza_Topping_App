import React from 'react'
import { Route, Switch } from 'react-router-dom'
import New from './new/New'
import Edit from './edit/Edit'

function Toppings() {
	return (
		<main>
			<Switch>
				<Route path='/toppings/new'>
					<New />
				</Route>
				<Route path='/toppings/:topping_id/edit'>
					<Edit />
				</Route>
			</Switch>
		</main>
	)
}

export default Toppings
