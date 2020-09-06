const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hospital_api');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to Database:: MongoDb');
});

module.exports = db;