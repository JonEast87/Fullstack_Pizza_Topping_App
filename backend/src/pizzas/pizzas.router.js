const router = require('express').Router()
const controller = require('./pizzas.controller')

/**
 * Defines the router for pizza resources.
 *
 * @type {Router}
 *
 */
router.route('/:pizza_id/edit').put(controller.update)

router.route('/:pizza_id').delete(controller.delete)

router.route('/').get(controller.list).post(controller.create)

module.exports = router
