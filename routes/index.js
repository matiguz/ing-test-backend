const event = require('./event');
const user = require('./user');

module.exports = (router) => {
    event(router),
    user(router)
 }
