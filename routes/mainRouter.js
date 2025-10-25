const { Router } = require("express");
const mainRouter = Router();

// root route
const mainController = require("../controllers/mainController.js");
mainRouter.get("/", mainController);

// all routes

// sign up and login controllers/middleware
const authController = require("../controllers/authController.js");

// sign up route and controller
mainRouter.get("/sign-up", authController.signupGet);
// Question: Should I add a login middleware/function after the signup to automatically log in after signing up?
mainRouter.post("/sign-up", authController.validateSignupFields, authController.signupPost); 

// login route and controller
mainRouter.get("/login", authController.loginGet);

const passport = require("passport"); // I don't like how passport has to be required here
mainRouter.post(
    "/login", 
    passport.authenticate("local", { // authenticate using LocalStrategy
        // optional success/failure redirect/message
        successRedirect: "/", // only if successRedirect is omitted, it calls next(). Not for failure
        failureRedirect: "/login",
        failureMessage: true, // adds message to req.session.messages, which it gets from LocalStrategy verify fn
    })
);

// logout post
mainRouter.post("/logout", authController.logoutPost);


const secretController = require("../controllers/secretController.js");

// secret password route
mainRouter.get("/secret-password", secretController.secretPasswordGet);

mainRouter.post("/secret-password", secretController.secretPasswordPost);

const messageController = require("../controllers/messageController.js");

// new message post
mainRouter.post("/new-message", messageController.newMessagePost);

// delete message post
mainRouter.post("/delete-message/:id", messageController.deleteMessagePost);


// catch-all for unmatched routes
mainRouter.use((req, res, next) => {
    const err = new Error("page not found");
    err.status = 404;
    next(err);
});

// error handler
mainRouter.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.setHeader('Content-Type', "text/plain");
    res.send(`${err.message}`);
});

module.exports = mainRouter;