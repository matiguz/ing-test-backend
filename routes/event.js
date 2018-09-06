const eventController = require('./../controllers/event')

module.exports = (router) => {

    /**
     * get all events
     */
    router
        .route('/events')
        .get(eventController.getAll)

    /**
     * add event
     */
    router
        .route('/events/add')
        .post(eventController.addEvent)

    /**
     * show event
     */
    router
    .route('/events/find')
    .post(eventController.findEvent)
}