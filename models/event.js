var mongoose = require('mongoose');
 
var eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    picture: String,
    place: String,
    days: {
            type: Date,
            default: Date.now
    },
    highlighted: Boolean
    
});
 
var Event = mongoose.model('Event', eventSchema);
 
module.exports = Event;