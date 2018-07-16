var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [2, "name must be 2 or more charcters"]},
    age: {type: Number, required: true, min: [2, "Mongoose must be 2 or older"]},
})
module.exports = mongoose.model('Mongoose', UserSchema);