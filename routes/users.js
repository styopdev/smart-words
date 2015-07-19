var express  = require('express');
var router   = express.Router();
var mongoose = require("mongoose");
/* GET users listing. */
router.get('/login', function(req, res, next) {
    var UserModel = require("../models/users");
    var user = new UserModel();
    user.username = "styopdev";
    user.rate     = 1000;
    user.socId    = "egljerugheilgherg45645f";
    user.socType  = "twitter";
    user.save(function(err){
        console.log(err);
    });
    res.render('login');
});

router.get('/rates', function(req, res, next) {
    var UserModel = require("../models/users");
    UserModel.find({}, function(err, result){
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
        console.log(req.body)
        if (req.body.username || req.body.email || req.body.id || req.body.socType) {
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
                            res.send(exUser._id);
                            return res.end();
                        });
                    }
                } else {
                    var user = new UserModel();
                    user.username = userInfo.user;
                    user.email    = userInfo.email;
                    user.userId   = userInfo.id;
                    user.socType  = userInfo.socType;
                    exUser.locale = userInfo.locale;
                    exUser.gender = userInfo.gender;

                    user.save(function (err) {
                        if (err) return next(err);
                        res.send(user._id);
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
