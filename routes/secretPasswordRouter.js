// ==== '/secret-password' route ====

const { Router } = require("express");
const secretPasswordRouter = Router();
const secretController = require("../controllers/secretController.js");

// secret password route
secretPasswordRouter.get("/", secretController.secretPasswordGet);

secretPasswordRouter.post("/", secretController.secretPasswordPost);

module.exports = secretPasswordRouter;