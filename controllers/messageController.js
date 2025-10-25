const { insertNewMessage, deleteMessageById } = require("../db/query.js");

const newMessagePost = async (req, res) => {
    const msg = req.body.messageText;
    const user = req.user.username;
    await insertNewMessage(msg, user);
    res.redirect("/");
};

const deleteMessagePost = async (req, res) => {
    if (req.user.is_admin) {
        await deleteMessageById(req.params.id);
    }
    res.redirect("/");
}

module.exports = {
    newMessagePost,
    deleteMessagePost,
};