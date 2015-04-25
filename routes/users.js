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
    res.send('Login respond with a resource');
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

module.exports = router;
