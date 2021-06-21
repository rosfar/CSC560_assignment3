const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SoccerDB', { useNewUrlParser: true}, (err) => {
    if (!err) {console.log('mongodb connection succeeded!')}
    else {console.log('mongodb connection error: ' + err) }
});

require('./soccer.model');