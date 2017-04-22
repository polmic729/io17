const express = require("express");
const passport = require("passport");
const router = express.Router();

/* GET login page. */
router.get("/", (req, res, next) => {

    res.render("login");

});

router.post("/", passport.authenticate("local"), (req, res) => {

    console.log("Authentication successful");
    res.redirect("/");

});

module.exports = router;