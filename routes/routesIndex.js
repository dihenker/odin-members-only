// got idea of "router index" from:
// https://www.robinwieruch.de/node-express-server-rest-api/

const loginRouter = require("./loginRouter.js");
const logoutRouter = require("./logoutRouter.js");
const signupRouter = require("./signupRouter.js");
const secretPasswordRouter = require("./secretPasswordRouter.js");
const messagesRouter = require("./messagesRouter.js");

module.exports = {
    loginRouter,
    logoutRouter,
    signupRouter,
    secretPasswordRouter,
    messagesRouter,
}