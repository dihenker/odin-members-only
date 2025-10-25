const { getAllMessages } = require("../db/query.js");

const indexGet = async (req, res) => {
    res.render("index", { user: req.user, msgs: await getAllMessages() });
};

module.exports = indexGet;