// =======================================
// authController.js
// Handle login and sign up
// =======================================
const db = require("../db/query.js");
const { body, validationResult, matchedData } = require("express-validator");

const signupGet = async (req, res) => {
    res.render("sign-up");
};

const validateSignupFields = [
    body("firstName")
        .trim()
        .notEmpty().withMessage("First name cannot be empty")
        .isAlpha().withMessage(`First name must only contain letters`),
    body("firstName")
        .trim()
        .notEmpty().withMessage("Last name cannot be empty")
        .isAlpha().withMessage(`Last name must only contain letters`),
    body("username")
        .trim()
        .custom(async (username) => {
            const user = await db.searchUserLogin(username);
            if (user) {
                throw new Error("Username already taken");
            }
        }),
    body("password")
        .trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage("Password must contain uppercase, lowercase, number, and special symbol"),
    body("confirm-password")
        .trim()
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Passwords don't match");
            }
            return true;
        }),    
]

const signupPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("sign-up", {
                errors: errors.array()
            });
        }

        // req.body has form data, but we use express-validator matchedData
        const data = matchedData(req); // sanitized form fields, e.g. trim()
        const user = await db.insertNewUser(data);
        // login automatically on signup and redirect to home page
        req.login(user, (err) => {
            if (err) { return next(err); };
            res.redirect("/");
        })
    } catch(err) {
        console.log(err);
        next(err);
    }
    
};

const loginGet = async (req, res) => {
    res.locals.loginErrorMsgs = req.session.messages; // if passport.authenticate failure, store error message
    res.render("login"); // locals.loginErrorMsgs accessible in view
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
    validateSignupFields,
    signupPost,
    loginGet,
    loginPost,
    logoutPost,
};