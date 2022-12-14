import React from 'react'

import { Link } from 'react-router-dom'

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
	return (
		<nav className='navbar navbar-dark align-items-start p-0'>
			<div className='container-fluid d-flex flex-column p-0'>
				<Link
					className='navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0'
					to='/'>
					<div className='sidebar-brand-text mx-3'>
						<span>Pizza Maker</span>
					</div>
				</Link>
				<hr className='sidebar-divider my-0' />
				<ul className='nav navbar-nav text-light' id='accordionSidebar'>
					<li className='nav-item'>
						<Link className='nav-link' to='/dashboard'>
							<span className='oi oi-dashboard' />
							&nbsp;Dashboard
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/pizzas/new'>
							<span className='oi oi-fire' />
							&nbsp;New Pizza
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/toppings/new'>
							<span className='oi oi-sun' />
							&nbsp;New Topping
						</Link>
					</li>
				</ul>
				<div className='text-center d-none d-md-inline'>
					<button
						className='btn rounded-circle border-0'
						id='sidebarToggle'
						type='button'
					/>
				</div>
			</div>
		</nav>
	)
}

export default Menu
