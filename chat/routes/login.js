var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', passport.authenticate('local'), function(req, res) {
    console.log("Authentication successful");
    res.redirect('/');
});

module.exports = router;