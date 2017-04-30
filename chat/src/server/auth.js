let express = require("express");
let router = express.Router();
let jwt = require("jsonwebtoken");

let config = require("../../config");
let User = require("./models/user");

router.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Fields 'username' and 'password' are required." });
        return;
    }
    User.authenticate(req.body.username, req.body.password, (user, error) => {
        if (error) {
            res.status(500).json({ message: error });
            return;
        }
        if (user) {
            res.status(200).json({ token: jwt.sign({ id: user._id }, config.secret) });
        } else {
            res.status(401).json({ message: "Invaild username or password." });
        }
    });
});

router.post("/register", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Fields 'username' and 'password' are required." });
        return;
    }
    User.create(req.body.username, req.body.password, (_, error) => {
        if (error) {
            res.status(500).json({ message: error });
            return;
        }
        res.status(204).send();
    });
});

module.exports = router;
