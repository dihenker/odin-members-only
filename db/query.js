const pool = require("./pool.js");

const searchUserLogin = async (username) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    // should return either 0 or 1 elements, since username should be unique
    return rows[0];
}

module.exports = {
    searchUserLogin,
};