const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session')
mongoose.connect('mongodb://localhost/message_board');

   // Use native promises
   mongoose.Promise = global.Promise;
const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "must have name"], minlength: [2, "name must be 2 or more charcters"]},
    comment: {type: String, required: [true, "must have comment"], minlength: [2, "comment must be 2 or more characters"]},
}, {timestamps: true});

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Must have a name"], minlength: [3, "name must be 2 or more charcters"]},
    message: {type: String, required: [true, "must have a message"], minlength: [3, "message must be 2 or more characters"]},
    comments: [CommentSchema]
}, {timestamps: true});
const Comment = mongoose.model('comments', CommentSchema);
const Message = mongoose.model('messages', MessageSchema);
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
app.get('/', (req, res)=>{
    Message.find({}, (err, messages)=>{
        if(err){
            console.log(err);
            console.log("We got some errors");
            res.json(err);
        }
        else{
            res.render('index', {message: messages});
        }
    })
})  
app.post('/create/message', (req, res)=>{
    Message.create({name: req.body.name, message: req.body.message}, (err, data)=>{
        if(err){
            console.log(err);
            for(var key in err.errors){
                req.flash('first', err.errors[key].message);
            }
            res.redirect('/')
        }
        else{
            console.log("create method worked!");
            res.redirect('/');
        }
    })
})
app.post('/create/comment/:id', (req, res)=>{
    Comment.create({name: req.body.cname, comment: req.body.comment}, (err,comment)=>{
        if(err){
            for(var key in err.errors){
                req.flash('second', err.errors[key].message);
            }
            res.redirect('/');
        }else{
            Message.findOneAndUpdate({_id: req.params.id},{$push: {comments: comment}}, (err,mess)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("create method worked for comment!");
                    console.log(mess);
                    res.redirect('/');
                }
            })
        }
    })

})
app.listen(8000, function(){
    console.log("listening on port 8000");
})