var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.render('category');
});

router.get('/tutorial', function(req, res, next) {
    res.render('tutorial');
});


router.get('/levels', function(req, res, next) {
    //if (!req.session.user_id) {
    //    return res.redirect("/users/login");
    //}
    var category = req.query.category;
    if (category) {
        var gameModel = require("../models/games");
        gameModel.findOne({"category" : category, "userId" : req.session.user_id}, function(err, game) {
            if (err) {
                return next(err);
            } else if (game) {
                return res.render('levels', {'game' : game});
            } else {
                var game = gameModel();
                game.userId = req.session.user_id;
                game.category = category;
                game.curLevel = 1;
                game.hintNum = 5;
                game.skipNum = 5;
                game.save(function(err){
                    if (err) return next(err);
                    return res.render('levels', {'game' : game});
                });
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
    var gameID = req.query.game_id;

    if (!gameID) {
        var err = new Error();
        err.statusCode = 400;
        return next(err);
    }

    gameModel.find({"_id" : gameID}, function(err, game) {
        if (err) {
            next(err);
        } else {
            var level = req.query.level ? req.query.level : game[0].curLevel;
            var difficulty = level <= 4 ? 1 : (level <= 8) ? 2 : 3;
            questionModel.find({"category": game[0].category, "difficulty":  difficulty}, function(err, questions){
                if (err) {
                    return next(err);
                } else {
                    res.render('play', {"questions": questions, "game": game[0], "level" : level});
                }
            });
        }
    });
});

router.get('/nextLevel', function(req, res, next) {
    var gameModel = require("../models/games");
    var game_id   = req.query.game_id;
    var level     = parseInt(req.query.level);
    var score     = req.query.score;

    gameModel.findOne({"_id" : game_id}, function(err, game) {
        if (err) return next(err);
        else {
            if (level < game.curLevel) {
                if (game.levels[level - 1] < score) {
                    game.levels[level - 1] = score;
                    game.save(function(err) {
                        if (err) return next(err);
                        else {
                            return res.redirect("/game/play?level=" + (level +1) + "&game_id=" + game_id);
                        }
                    });
                }
            } else {
                game.curLevel = level + 1;
                if (!game.levels)
                    game.levels = [];
                game.levels.push(parseInt(score));

                game.save(function(err) {
                    if (err) return next(err);
                    else {
                        return res.redirect("/game/play?level=" + game.curLevel + "&game_id=" + game_id);
                    }
                });
            }
        }
    });
});

router.get('/decrementHint', function(req, res, next) {
    var gameModel = require("../models/games");
    var updateObject = req.query.hintType == "hintNum" ? {"$inc" : {"hintNum" : -1}} : {"$inc" : {"skipNum" : -1}};
    var game_id  = req.query.game_id;

    if (!updateObject || !game_id)
        return;
    gameModel.update({"_id" : game_id}, updateObject, function(err) {
        if (err) {
            return next(err);
        } else {
            return res.end();
        }
    });
});


module.exports = router;
