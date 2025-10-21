const pool = require("./pool.js");
const bcrypt = require("bcryptjs");

const searchUserLogin = async (username) => {
    // should return either 0 or 1 elements, since username should be unique
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    
    return rows[0]; // either returns the object result, or undefined if no user found
}

// not in a try...catch. It is called in try catch in authController
const insertNewUser = async (userInfo) => {
    // 10 is the salt. Can do bcrypt salt gen too
    // should probably do that, to have random salt
    // sometimes you'd have to store salt with the hash, but here it is handled
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const { rows } = await pool.query(
        "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, username",
        [userInfo.firstName, userInfo.lastName, userInfo.username, hashedPassword]
    )
    return rows[0]; // should return one result, the newly inserted row

};

module.exports = {
    searchUserLogin,
    insertNewUser,
};