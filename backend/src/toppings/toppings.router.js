const router = require('express').Router()
const controller = require('./toppings.controller')

/**
 * Defines the router for the topping resource.
 *
 * @type {Router}
 *
 */

router.route('/:topping_id/edit').put(controller.update)

router.route('/:topping_id').delete(controller.delete)

router.route('/').get(controller.list).post(controller.create)

module.exports = router
