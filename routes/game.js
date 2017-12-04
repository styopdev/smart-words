var express = require('express');
var router = express.Router();
var userModel = require("../models/users");
var gameModel = require("../models/games");
var questionModel = require("../models/questions");

/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.render('category');
});

router.get('/tutorial', function(req, res, next) {
    res.render('tutorial');
});

router.get('/levels', function(req, res, next) {
    var category = req.query.category;
    if (category) {
        gameModel.findOne({ category: category, userId: req.session.user_id }, function(err, game) {
            if (err) {
                return next(err);
            } else if (game) {
                return res.render('levels', { game: game });
            } else {
                var game = gameModel();
                game.userId = req.session.user_id;
                game.category = category;
                game.curLevel = 1;
                game.hintNum = 5;
                game.skipNum = 5;
                game.save(function(err){
                    if (err) return next(err);
                    return res.render('levels', { game: game });
                });
            }
        });
    } else {
        res.statusCode = 400;
        res.end();
    }
});


router.get('/play', function(req, res, next) {
    var gameID = req.query.game_id;

    if (!gameID) {
        var err = new Error();
        err.statusCode = 400;
        return next(err);
    }

    gameModel.find({ _id: gameID }, function(err, game) {
        if (err) {
            next(err);
        }

        var level = req.query.level ? req.query.level : game[0].curLevel;
        var difficulty = level <= 4 ? 1 : (level <= 8) ? 2 : 3;

        questionModel.find({ category: game[0].category, difficulty: difficulty}, function(err, count) {
            var randNum = Math.random() * (count - 0 )+ 0;
            questionModel.find({ category: game[0].category, difficulty: difficulty }).skip(randNum).limit(10).exec(function(err, questions) {
                if (err) {
                    return next(err);
                } else {
                    res.render('play', { questions: questions, game: game[0], level: level });
                }
            });
        });
    });
});

router.get('/nextLevel', function(req, res, next) {
    var game_id = req.query.game_id;
    var score = req.query.score;
    var level = parseInt(req.query.level);

    gameModel.findOne({ _id: game_id}, function(err, game) {
        if (err) {
          return next(err);
        }
        if (level < game.curLevel) {
            if (game.levels[level - 1] < score) {
                game.levels[level - 1] = score;
                game.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        calculateUserRate(1);
                    }
                });
            }
        } else {
            game.curLevel = level + 1;
            if (!game.levels) {
              game.levels = [];
            }

            game.levels.push(parseInt(score));

            game.save(function(err) {
                if (err) {
                  return next(err);
                } else {
                    calculateUserRate(0);
                }
            });
        }

        function calculateUserRate(isNewLevel) {
            gameModel.find({ userId: req.session.user_id }, function(err, games) {
                if (err) {
                  return next(err);
                }
                var rating = 0;
                var coef  = 0;

                for (var i = 0; i < games.length; i++) {
                    for (var j = 0; j < games[i].levels.length; j++) {
                        if (parseInt(j < 5)) {
                            coef = 10;
                        } else if (parseInt(j < 9)) {
                            coef = 15;
                        } else {
                            coef = 20;
                        }
                        rating += (coef * parseInt(games[i].levels[j]));
                    }
                }
                userModel.findOne({ _id : req.session.user_id }, function(err, user) {
                    if (err) {
                      return next(err);
                    } else if (!user) {
                        var err = new Error();
                        err.statusCode = 404;
                        return next(err);
                    } else {
                        user.score = rating;
                        user.save(function(err) {
                            if (err) {
                              return next(err);
                            }

                            if (isNewLevel) {
                                return res.redirect("/game/play?level=" + game.curLevel + "&game_id=" + game_id);
                            } else {
                                return res.redirect("/game/play?level=" + (level +1) + "&game_id=" + game_id);
                            }
                        })
                    }
                });
            });
        }
    });
});

router.get('/decrementHint', function(req, res, next) {
    var updateObject = req.query.hintType == "hintNum" ? {"$inc" : {"hintNum" : -1}} : {"$inc" : {"skipNum" : -1}};
    var game_id  = req.query.game_id;

    if (!updateObject || !game_id) {
      return;
    }

    gameModel.update({ _id: game_id }, updateObject, function(err) {
        if (err) {
            return next(err);
        }
        return res.end();
    });
});


module.exports = router;
