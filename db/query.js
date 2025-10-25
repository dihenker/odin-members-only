const pool = require("./pool.js");
const bcrypt = require("bcryptjs");

const searchUserLogin = async (username) => {
    // should return either 0 or 1 elements, since username should be unique
    // lower to search usernames case insensitively - ensure unique usernames
    const { rows } = await pool.query("SELECT id, username, password FROM users WHERE LOWER(username) = LOWER($1)", [username]);
    
    return rows[0]; // either returns the object result, or undefined if no user found
}

// not in a try...catch. It is called in try catch in authController
const insertNewUser = async (userInfo) => {
    // 10 is the salt. Can do bcrypt salt gen too
    // should probably do that, to have random salt
    // sometimes you'd have to store salt with the hash, but here it is handled
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const { rows } = await pool.query(
        "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, username, is_vip",
        [userInfo.firstName, userInfo.lastName, userInfo.username, hashedPassword]
    )
    return rows[0]; // should return one result, the newly inserted row, to attach to req for auto login

};

const updateVipStatus = async (userId, status) => {
    await pool.query("UPDATE users SET is_vip=$1 WHERE id=$2", [status, userId]);
}

const insertNewMessage = async (message, user) => {
    // insert user message
    // parameterized sql queries (i.e. $1, $2, etc) prevent sql injection i.e. "sanitize input"
    await pool.query("INSERT INTO messages (message, author) VALUES ($1, $2)", [message, user]);
}

const getAllMessages = async () => {
    const { rows } = await pool.query("SELECT id, message, author, TO_CHAR(created_at, 'Mon DD YYYY HH24:MI:SS') AS formatted_created_at FROM messages");
    
    return rows; // array of all messages rows - message, date, author
}

const deleteMessageById = async (id) => {
    console.log(id);
    await pool.query("DELETE FROM messages WHERE id=$1", [id]);
}

const getDeserializedUserInfo = async (id) => {
    const { rows } = await pool.query("SELECT id, first_name, last_name, username, is_vip, is_admin FROM users WHERE id = $1", [id]);
    return rows[0];
}

module.exports = {
    searchUserLogin,
    insertNewUser,
    updateVipStatus,
    insertNewMessage,
    getAllMessages,
    deleteMessageById,
    getDeserializedUserInfo,
};