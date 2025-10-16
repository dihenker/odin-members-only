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
mainRouter.post("/sign-up", authController.signupPost); 

// login route and controller
mainRouter.get("/login", authController.loginGet);

const passport = require("passport");
mainRouter.post(
    "/login", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

// logout post
mainRouter.post("/logout", authController.logoutPost);


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