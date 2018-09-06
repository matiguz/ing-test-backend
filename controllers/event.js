const Event = require('./../models/event')

const mongoose = require('mongoose');
let cUser = require('./user')

module.exports = {

    /***
    ***GET ALL EVENTS
    ***/
    getAll: (req,res,next) => {
            Event.find({}, function(err,events){
                if (err)
                    res.send(err)
                else if (!events)
                    res.send(404)
                else {
                    res.send(JSON.stringify(events));
                }
            })
    },
    addEvent: (req,res,next) => {
        
        /***
        ***ADD EVENTO
        ***/
        
        let token = req.headers.authorization;
        if(cUser.verifyAccessToken(token)){
            let title = req.body.title;
            let description = req.body.description;
            let picture = req.body.url_picture;
            let place = req.body.place;
            let days = req.body.days;
            let highlighted = req.body.highlighted;
            if(highlighted = "on"){
                highlighted=true;
            }else{
                highlighted=false;
            }

            let event = new Event({
                _id: new mongoose.Types.ObjectId(),
                title: title,
                description: description,
                picture: picture,
                place: place,
                highlighted: highlighted,
                days: Date(days)
                
            });

            event.save(function(err){
                if (err) throw console.log(err);
            })
            res.status(201).send("Alta correcta");
        }else {
            res.status(401);
        }
    },

    findEvent: (req,res,next) => {

        /***
        ***FIND EVENTO
        ***/
      let {id} = req.body;
      Event.findById(id, function (err, event) {
            if (err)
                res.send(err)
            else if (!event){
              res.send(404)
            }
            else {
                res.send(JSON.stringify(event));
            }
       });

    }
}