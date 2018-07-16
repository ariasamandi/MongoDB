var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var person = require('./../models/person.js');
module.exports = {
    index: function(req, res){
        person.find({}, (err, person)=>{
            if(err) {
                console.log('something went wrong');
            } 
            else {
            console.log('successfully added a user!');
                res.json({people: person});

            }
        })
    },
    new: function(req, res){
        person.create({name: req.params.name}, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("this is the create method");
                res.json({message: "success", data: data})
            }
        })
    },
    remove: function(req, res){
        person.remove({name: req.params.name}, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("sucess");
                res.json({removed_user: data});
            }
        })
    },
    show: function(req, res){
        person.findOne({name: req.params.name}, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("sucess");
                res.json({user: data})
            }
        })
    }
}