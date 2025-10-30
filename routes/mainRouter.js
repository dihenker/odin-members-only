const { Router } = require("express");
const mainRouter = Router();
const routes = require("./routesIndex.js");

// root route
const mainController = require("../controllers/mainController.js");
mainRouter.get("/", mainController);

// all routes
mainRouter.use("/sign-up", routes.signupRouter);
mainRouter.use("/login", routes.loginRouter);
mainRouter.use("/logout", routes.logoutRouter);
mainRouter.use("/secret-password", routes.secretPasswordRouter);
mainRouter.use("/messages", routes.messagesRouter);

// catch-all for unmatched routes
mainRouter.use((req, res, next) => {
    const err = new Error("page not found");
    err.status = 404;
    res.status(err.status);
    res.render("404", { errMsg: err.message, errStatus: err.status });
});

// error handler
mainRouter.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.setHeader('Content-Type', "text/html");
    res.render("error", { errMsg: err.message, errStatus: err.message });
});

module.exports = mainRouter;