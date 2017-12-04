var express = require('express');
var router = express.Router();
var QuestionModel = require("../models/questions");

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
    res.send('Display reg. users info');
});

router.get('/questions', function(req, res, next) {
    QuestionModel.find({}, function(err, questions) {
        if (err) {
            return next(err);
        }
        res.render("../views/admin/questions", {"questions" : questions});
    });
});

router.post('/form', function(req, res, next) {
    var reqQuestion = req.body.text;
    if (reqQuestion) {
        if (!req.body.question_id) {
            var question         = new QuestionModel();
            question.text        = req.body.text;
            question.answers     = [req.body.answers_0, req.body.answers_1, req.body.answers_2, req.body.answers_3];
            question.rightAnswer = req.body.rightAnswer;
            question.difficulty  = req.body.difficulty;
            question.category    = req.body.category;

            question.save(function(err){
                if (err) {
                    return next(err);
                }
                res.redirect("/admin/questions");
            });
        } else {
            QuestionModel.update({ _id : req.body.question_id },
              { $set :
                {
                    text: req.body.text,
                    answers: [req.body.answers_0, req.body.answers_1, req.body.answers_2, req.body.answers_3],
                    rightAnswer: req.body.rightAnswer,
                    difficulty: req.body.difficulty,
                    category: req.body.category
                }
              }, function(err, affected) {
                  if (err) {
                    return next(err);
                  }
                  res.redirect("/admin/questions");
              });
        }
    }
});

router.get('/form', function(req, res, next) {
    if (req.query.id) {
        QuestionModel.findById(req.query.id, function (err, question) {
            res.render("../views/admin/q-form.jade", { question: question });
        });
    } else {
        res.render("../views/admin/q-form.jade", { question : {} });
    }
});

router.get('/delete', function(req, res, next) {
    if (req.query.id) {
        QuestionModel.find({"_id" : req.query.id}).remove().exec(function(err){
            if (err) return next(err);
            res.redirect(req.headers["referer"]);
        });
    }
});
module.exports = router;
