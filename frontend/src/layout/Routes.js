import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Pizzas from '../pizzas/Pizza'
import NotFound from './NotFound'
import Toppings from '../toppings/Toppings'

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
	return (
		<Switch>
			<Route exact={true} path='/'>
				<Redirect to={'/dashboard'} />
			</Route>
			<Route path='/dashboard'>
				<Dashboard />
			</Route>
			<Route path='/pizzas'>
				<Pizzas />
			</Route>
			<Route path='/toppings'>
				<Toppings />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	)
}

export default Routes
