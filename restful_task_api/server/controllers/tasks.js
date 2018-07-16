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
        Task.create(req.params.body, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("this is the create method");
                res.json({task: "success", data: data})
            }
        })
    },
    delete: (req, res)=>{
        Task.findOneAndRemove({task: req.params.task}, (err, data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                console.log("Removed");
                res.json({removed: data})
            }
        })
    }
}