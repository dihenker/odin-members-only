// =======================================
// authController.js
// Handle login and sign up
// =======================================


const signupGet = async (req, res) => {
    res.render("sign-up");
}


const signupPost = async (req, res) => {
    res.redirect("/");
}

const loginGet = async (req, res) => {
    res.render("login");
}


const loginPost = async (req, res) => {
    res.redirect("/");
}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost,
};