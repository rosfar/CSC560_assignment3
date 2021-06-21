const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Soccer = mongoose.model('Soccer');

router.get('/', (req,res) => {
    res.render("soccer/addOrEdit", {
        viewTitle : "Insert Player"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var soccer = new Soccer();
    soccer.name = req.body.name;
    soccer.gamePlayed = req.body.gamePlayed;
    soccer.goals = req.body.goals;
    soccer.assists = req.body.assists;
    soccer.shots = req.body.shots;
    soccer.yellowCards = req.body.yellowCards;
    soccer.redCards = req.body.redCards;
    soccer.save((err, doc) => {
        if (!err)
            res.redirect('soccer/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("soccer/addOrEdit", {
                    viewTitle: "Insert Player",
                    soccer: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    soccer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('soccer/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("soccer/addOrEdit", {
                    viewTitle: 'Update Player',
                    soccer: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Soccer.find((err, docs) => {
        if (!err) {
            res.render("soccer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving player list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'gamesPlayed':
                body['gamesPlayedError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    soccer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("soccer/addOrEdit", {
                viewTitle: "Update Player",
                soccer: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Soccer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/soccer/list');
        }
        else { console.log('Error in player delete :' + err); }
    });
});

module.exports = router;