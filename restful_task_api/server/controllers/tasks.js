const Task = require('./../models/task.js');
module.exports = {
    index: (req, res)=>{
        Task.find({}, (err, data)=>{
            if(err) {
                console.log('something went wrong');
            } 
            else {
            console.log('successfully added a user!');
                res.json({tasks: data});
    
            }
        })
    },
    show: (req, res)=>{
        Task.findOne({_id: req.params.id}, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("sucess");
                res.json({task: data})
            }
        })
    },
    create: (req, res)=>{
        console.log(req.body);
        Task.create(req.body, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("this is the create method");
                res.json({data: data})
            }
        })
    },
    delete: (req, res)=>{
        Task.findOneAndRemove({_id: req.params.id}, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("Removed");
                res.json({removed: data})
            }
        })
    },
    update: (req, res)=>{
        console.log("phase 1");
        Task.update({_id: req.params.id}, req.body, (err, data)=>{
            console.log("phase 1");
            if(err){
                console.log("phase 2");
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log(data);
                res.json({update: data})
            } 
        })
    }
}