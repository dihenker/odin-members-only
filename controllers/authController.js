// =======================================
// authController.js
// Handle login and sign up
// =======================================
const db = require("../db/query.js");

const signupGet = async (req, res) => {
    res.render("sign-up");
};


const signupPost = async (req, res, next) => {
    try {
        // req.body has form data
        const user = await db.insertNewUser(req.body);
        // login automatically on signup and redirect to home page
        req.login(user, (err) => {
            if (err) { return next(err); };
            res.redirect("/");
        })
        // res.redirect("/login"); // will want to login automatically and redirect to home, change later
    } catch(err) {
        console.log(err);
        next(err);
    }
    
};

const loginGet = async (req, res) => {
    res.locals.loginErrorMsgs = req.session.messages; // if passport.authenticate failure, store error message
    res.render("login"); // locals.loginError accessible in view
};

// unncesscary since passport.authenticate deals with it
// what if I want more
const loginPost = async (req, res) => {
};   

const logoutPost = async (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
};

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost,
    logoutPost,
};