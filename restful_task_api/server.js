const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8000, function(){
    console.log("listening on port 8000");
})
