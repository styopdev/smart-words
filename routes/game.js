var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.render('category');
});

router.get('/levels', function(req, res, next) {
    var category = req.query.category;
    if (category) {
        var gameModel = require("../models/games");
        gameModel.find({"category" : category}, function(err, game){
            if (err) {
                next(err);
            } else {
                console.log(game)
                res.render('levels', {'game' : game[0]});
            }
        });
    } else {
        res.statusCode = 400;
        res.end();
    }
});


router.get('/play', function(req, res, next) {
    var gameModel = require("../models/games");
    var questionModel = require("../models/questions");
    var gameID   = req.query.game_id;
    //var category = req.query.category;
    //var level    = req.query.level;

        gameModel.find({"_id" : gameID}, function(err, game){
            if (err) {
                next(err);
            } else {
                var difficulty = game[0].curLevel <= 4 ? 1 : (game[0].curLevel <= 8) ? 2 : 3;
                questionModel.find({"category": game[0].category, "difficulty":  difficulty}, function(err, questions){
                    if (err) {
                        next(err);
                    } else {
                        console.log(questions)
                        res.render('play', {"questions": questions, "game": game[0]});
                    }
                });
            }
        });
});
router.get('/decrementHint', function(req, res, next) {
    var gameModel = require("../models/games");
    var hintType = req.query.hintType;
    if (hintType == "remove") {
       // gameModel.update({"_id" : });
    } else if (hintType == "skip") {

    }
});


module.exports = router;
