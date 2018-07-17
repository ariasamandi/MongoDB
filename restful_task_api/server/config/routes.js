const mongoose = require('mongoose');
const task = require('./../controllers/tasks.js');
module.exports = function(app){
    app.get('/tasks', (req, res)=>{
        task.index(req, res);
    })
    app.get('/task/:id', (req, res)=>{
        task.show(req, res);
    })
    app.post('/create', (req, res)=>{
        task.create(req, res);
    })
    app.delete('/delete/:id', (req, res)=>{
        task.delete(req, res);
    })
    app.put('/update/:id', (req, res)=>{
        task.update(req, res);
    })
}