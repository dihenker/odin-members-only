// ==== '/login' route ====

const { Router } = require("express");
const loginRouter = Router();
const authController = require("../controllers/authController.js");
const passport = require("passport");

// login route and controller
loginRouter.get("/", authController.loginGet);

// maybe try putting passport.authenticate into authController somehow
// perhaps function that returns it right away
loginRouter.post(
    "/", 
    passport.authenticate("local", { // authenticate using LocalStrategy
        // optional success/failure redirect/message
        successRedirect: "/", // only if successRedirect is omitted, it calls next(). Not for failure
        failureRedirect: "/login",
        failureMessage: true, // adds message to req.session.messages, which it gets from LocalStrategy verify fn
    })
);

module.exports = loginRouter;