const { Router } = require("express");
const mainRouter = Router();

// root route
const mainController = require("../controllers/mainController.js");
mainRouter.get("/", mainController);

// routes
const userRouter = require("./userRouter.js");


mainRouter.use("/sign-up", userRouter);


// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.setHeader('Content-Type', "text/plain");
    res.send(err.message);
});