var express  = require('express');
var router   = express.Router();
var mongoose = require("mongoose");
/* GET users listing. */
router.get('/login', function(req, res, next) {
    if (!req.session.user_id)
      return res.render('login');
    return res.redirect('/game/category');
});

router.get('/rates', function(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect("/users/login");
    }
    var UserModel = require("../models/users");
    UserModel.findOne({"_id" : req.session.user_id}, function(err, result){
        if (err) {
            next(err);
        } else {
            res.render("../views/rates",{users:result});
        }
    });
});

router.post('/create', function(req, res, next) {
    var UserModel = require("../models/users");
    if (req.body) {
        if (req.body.name && req.body.email && req.body.id && req.body.socType && req.body.gender && req.body.locale) {
            var userInfo = req.body;
            UserModel.findOne({"userId": userInfo.id}, function (err, exUser) {
                if (err) return next(err);
                if (exUser) {
                    if (exUser.email != userInfo.email || exUser.username != userInfo.name || exUser.locale != userInfo.locale) {
                        exUser.email    = userInfo.email;
                        exUser.username = userInfo.name;
                        exUser.locale   = userInfo.locale;

                        exUser.save(function (err) {
                            if (err) return next(err);
                            req.session.user_id = exUser._id;
                            res.statusCode = 200;
                            return res.end();
                        });
                    } else {
                        req.session.user_id = exUser._id;
                        res.statusCode = 200;
                        return res.end();
                    }
                } else {
                    var user = new UserModel();
                    user.username = userInfo.name;
                    user.email    = userInfo.email;
                    user.userId   = userInfo.id;
                    user.socType  = userInfo.socType;
                    user.locale   = userInfo.locale;
                    user.gender   = userInfo.gender;
                    user.save(function (err) {
                        if (err) return next(err);
                        req.session.user_id = user._id;
                        res.statusCode = 200;
                        return res.end();
                    });
                }
            });
        } else {
            res.statusCode = 400;
            return res.end();
        }
    } else {
        res.statusCode = 400;
        return res.end();
    }
});
module.exports = router;
