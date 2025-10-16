// =======================================
// authController.js
// Handle login and sign up
// =======================================
const bcrypt = require("bcryptjs");
const pool = require("../db/pool.js"); // I don't like how pool has to be required here, queries should be in query.js


const signupGet = async (req, res) => {
    res.render("sign-up");
};


const signupPost = async (req, res) => {
    try {
        // 10 is the salt. Can do bcrypt salt gen too
        // should probably do that
        // sometimes you'd have to store salt with the hash, but here it is handled
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [
            req.body.firstName,
            req.body.lastName,
            req.body.username,
            hashedPassword,
        ])
        res.redirect("/login"); // will want to login automatically and redirect to home, change later
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
} ;   

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