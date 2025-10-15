// =======================================
// authController.js
// Handle login and sign up
// =======================================


const signupGet = async (req, res) => {
    res.render("sign-up");
}


const signupPost = async (req, res) => {

}

const loginGet = async (req, res) => {
    res.render("login");
}


const loginPost = async (req, res) => {

}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost,
};