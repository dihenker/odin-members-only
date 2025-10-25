const { insertNewMessage } = require("../db/query.js");

const newMessagePost = async (req, res) => {
    const msg = req.body.messageText;
    const user = req.user.username;
    await insertNewMessage(msg, user);
    res.redirect("/");
};

module.exports = newMessagePost;