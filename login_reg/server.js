const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/login_reg');

   // Use native promises
   mongoose.Promise = global.Promise;
const UserSchema = new mongoose.Schema({
    email: {type: String, required: [true, "An email is required."]},
    first_name: {type: String, required: [true, "A first name is required."], minlength: [2, "Your first name is too short."]},
    last_name: {type: String, required: [true, "A last name is required."], minlength: [2, "Your last name is too short."]},
    birthday: {type: String, required: [true, "A birthday is required."]},
    password: String
}, {timestamps: true});
const User = mongoose.model('users', UserSchema);
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
bcrypt.hash('password_from_form', 10, function(err, hash){

})

app.get('/', (req, res)=>{
    res.render('index');
})
app.post('/registration', (req, res)=>{
    bcrypt.hash(req.body.password, 10, function(err, hash){
        User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, birthday: req.body.birthday, password: hash}, (err, user)=>{
            if(err){
                for(var key in err.errors){
                    req.flash('register', err.errors[key].message);
                }
                res.redirect('/');
            }
            else{
                res.redirect('/works');
            }
        })
        res.redirect('/');
    })
})
app.post('/login', (req, res)=>{
    console.log(" req.body: ", req.body);
   
    User.findOne({email:req.body.email}, (err, user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if(!result){
                    req.flash('error', "incorrect email or password.");
                }
                else{
                    req.session.id = user._id;
                    res.render('/works');
                }
            })
            // Code...
        }
        else {
            req.flash('error', "incorrect email or password");
            res.render('/');
        }
    })
    bcrypt.compare('password_from_form', 'stored_hashed_password')
})
app.listen(8000, function(){
    console.log('listening on port 8000');
});