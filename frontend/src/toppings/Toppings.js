import React from 'react'
import { Route, Switch } from 'react-router-dom'
import New from './new/New'

function Toppings() {
	return (
		<main>
			<Switch>
				<Route path='/toppings/new'>
					<New />
				</Route>
			</Switch>
		</main>
	)
}

export default Toppings
