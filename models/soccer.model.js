const mongoose = require('mongoose');

var soccerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    gamesPlayed: {
        type: Number,
        required: 'This field is required'
    },
    goals: {
        type: Number
    },
    assists: {
        type: Number
    },
    shots: {
        tpye: Number
    },
    yellowCards: {
        type: Number
    },
    redCards: {
        type : Number
    }
});

mongoose.model('Soccer', soccerSchema);