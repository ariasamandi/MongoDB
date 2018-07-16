var mongoose = require('mongoose');
const flash = require('express-flash');
var bodyParser = require('body-parser');
var User = require('./../models/quote.js');
module.exports = {
    index: function(req, res){
        res.render('index');
    },
    quotes: function(req, res){ 
        User.find({}, function(err, users){
            if(err) {
                console.log('something went wrong');
            } 
            else {
            console.log('successfully added a user!');
            res.render('quotes', {users: users});
            }
        }).sort({'updatedAt': -1})
    },
    create: function(req, res){
        console.log("POST DATA", req.body);
        // create a new User with the name and age corresponding to those from req.body
        var user = new User({name: req.body.name, quote: req.body.quote, created_at: req.body.created_at});
        // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        user.save(function(err) {
          // if there is an error console.log that something went wrong!
          if(err) {
            console.log('something went wrong');
          } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('/quotes');
          }
        })
    }
}