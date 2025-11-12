const { updateVipStatus } = require("../db/query.js");
const { body } = require("express-validator");

const secretPasswordGet = (req, res) => {
    res.render("secret-password", { user: req.user });
};

const secretPasswordPost = (req, res) => {
    const password = req.body["secret-password"];
    if (password == process.env.SECRET_PASSWORD) {
        // change is_vip to true
        // need user id to find user
        // redirect home
        updateVipStatus(req.user.id, true);
        res.redirect("/");
    } else {
        // wrong password, retry message
        // redirect to secret password page again
        // show error
        res.redirect("/secret-password");
    }
};

module.exports = {
    secretPasswordGet,
    secretPasswordPost,
    secretPasswordTrim: body("secret-password").trim()
};