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
    res.send('Play respond with a resource');
});

module.exports = router;
