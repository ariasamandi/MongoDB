const mongoose = require('mongoose');
const task = require('./../controllers/tasks.js');
module.exports = function(app){
    app.get('/', (req, res)=>{
        task.index(req, res);
    })
    app.get('/task/:task', (req, res)=>{
        task.show(req, res);
    })
    app.get('/create', (req, res)=>{
        task.create(req, res);
    })
    app.get('/delete/:task', (req, res)=>{
        task.delete(req, res);
    })
}