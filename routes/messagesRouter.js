// ==== '/messages' route ====

const { Router } = require("express");
const messagesRouter = Router();
const messageController = require("../controllers/messageController.js");

// new message post
messagesRouter.post("/", messageController.newMessagePost);

// delete message post
// should be DELETE method (here and in form), but doesn't work. changes URL to that route
// maybe something to do with DELETE method on forms
// EDIT: DELETE is not a valid method for forms 
// would need change from form button, to a button with a fetch call onClick
messagesRouter.post("/:id", messageController.deleteMessagePost);

module.exports = messagesRouter;