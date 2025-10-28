// ==== '/logout' route ====

const { Router } = require("express");
const logoutRouter = Router();
const authController = require("../controllers/authController.js");

logoutRouter.post("/", authController.logoutPost);

module.exports = logoutRouter;