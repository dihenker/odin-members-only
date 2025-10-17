const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// ?: understanding passport sessions
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require("./routes/mainRouter.js");
app.use("/", mainRouter);

// LocalStrategy setup
// verifying login info
const { searchUserLogin } = require("./db/query.js");

passport.use(
    new LocalStrategy(async (username, password, cb) => {
        try {
            const user = await searchUserLogin(username);

            // if user not found
            if (!user) {
                return cb(null, false, { message: "User does not exist" }); // for better security, replace with "incorrect username or password"
            }
            // check password
            // deals with salting
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return cb(null, false, { message: "Incorrect password" });
            }
            return cb(null, user);
        } catch(err) {
            return cb(err);
        }
    })
);

// user login session info

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

const pool = require("./db/pool.js");

passport.deserializeUser(async (id, cb) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        cb(null, user);
    } catch (err) {
        cb(err);
    }
});

// setup server and listen
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is running on port ${PORT}`);
});