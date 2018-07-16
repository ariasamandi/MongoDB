const mongoose = require('mongoose');
const Mongoose = require('./../models/user.js');
const bodyParser = require('body-parser');
module.exports = {
    index: function(req, res){
        Mongoose.find({}, (err, mongooses)=>{
            if(err){
                console.log(err);
                console.log("We got some errors");
            }
            else{
                res.render('index', {allMongooses: mongooses});
            }
        })
    },
    new: function(req, res) {
    	res.render('new');
    },
    create: function(req, res){
        Mongoose.create({name: req.body.name, age: req.body.age}, (err, data)=>{
            if(err){
                console.log(err);
                for(var e in err.errors){
                    console.log(e);
                    req.flash('myerror', err.errors[e].message);
                }
            }
            else{
            
                console.log("this is the create method");
                res.redirect('/');
            }
        })
    },
    destroy: function(req, res){
        Mongoose.remove({_id: req.params.id}, (err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("sucess");
                res.redirect('/');
            }
        })
    },
    show: function(req, res){
        Mongoose.findById({_id:req.params.id}, (err, goose)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(goose);
                res.render("show", {goose: goose});
            }
           
        })
    },
    edit: function(req, res){
        Mongoose.findOne({_id: req.params.id}, (err, goose)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                res.render("edit", {goose: goose});
            }
        })
    },
    update: function(req, res){
        Mongoose.update({_id: req.params.id}, req.body, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect(`/mongooses/edit/${req.params.id}`);
            }
            else{
                console.log("we did it" + data);
                res.redirect('/');
            }
        })
    }
}