var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.send('Category respond with a resource');
});

router.get('/levels', function(req, res, next) {
    res.send('Levels respond with a resource');
});

router.get('/play', function(req, res, next) {
    var gameModel = require("../models/games");
    var questionModel = require("../models/questions");

        gameModel.find({}, function(err, game){
            if (err) {
                next(err);
            } else {
                questionModel.find({"category": game[0].category, "level":  game[0].curLevel}, function(err, questions){
                    if (err) {
                        next(err);
                    } else {
                        res.render('play', {"questions": questions, "game": game[0]});
                    }
                });
            }
        });

});

module.exports = router;
