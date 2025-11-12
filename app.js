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

// sessions currently stored in memory. Should create DB for it. 
// passport will add passport property (sql column) to object (sql row), and passport stuff all in there

// establish express session
app.use(session({ 
    secret: process.env.SESSION_SECRET || "cats", // this should be a secret. Make a .env variable
    resave: false, 
    saveUninitialized: false,
    cookie: {},
})); 
app.use(passport.session()); // calls deserialize and stores user info into req.user
app.use(express.urlencoded({ extended: false }));

// should this come after the passport setup?
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

// according to passport documentation
// if session info is used on every page, then should store on session 
// and reduce having to make database query every time
// ANSWER: serialize/deserialize like encrypt/decrypt (without security)
// we can serialize all our data, but it could be a lot, hence why you could
// serialize an ID or something, and query for rest of user information
// but if not much user information, could serialize it all and avoid having to query
// e.g. could serialize id and username (don't serialize sensitive info, like password)
// then deserialize and use the username right away, 
// without having to query database with ID to find username
const { getDeserializedUserInfo } = require("./db/query.js");

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await getDeserializedUserInfo(id);
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