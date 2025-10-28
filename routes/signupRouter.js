// ==== '/sign-up' route ====

const { Router } = require("express");
const signupRouter = Router();
const authController = require("../controllers/authController.js");

// sign up route and controller
signupRouter.get("/", authController.signupGet);
// Question: Should I add a login middleware/function after the signup to automatically log in after signing up?
// EDIT: did it in signupPost itself. Maybe separate it? One deals with strictly storing in db then another for login
signupRouter.post("/", authController.validateSignupFields, authController.signupPost); 

module.exports = signupRouter;