let express = require("express");
let router = express.Router();

router.post("/login", (req, res) => {
    let isValid = false;

    // TODO: use passport to authenticate user

    if (isValid) {
        // TODO: set up user session
        res.redirect("/");
    } else {
        res.send("Invalid credentials.");
    }
});

router.get("/logout", (req, res) => {
    delete req.session.user_id;
    res.redirect("/login");
});

module.exports = router;
