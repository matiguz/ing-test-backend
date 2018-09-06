const userController = require('./../controllers/user')

module.exports = (router) => {

    /**
     * get session
     */
    router
        .route('/sessions/create')
        .post(userController.sessionCreate)
}