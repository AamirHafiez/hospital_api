const express = require('express');
const app = express();
const port = 8000;
const passport = require('passport');
const passportJwt = require('./config/passport-jwt-strategy');
// connection to mongoose
const db = require('./config/mongoose');

// for form body
app.use(express.urlencoded());

// routes
app.use('/', require('./routes'));

// listening to server
app.listen(port, function(err){
    if(err){
        console.log('Error in running server');
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});