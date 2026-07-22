const jwt = require("jsonwebtoken");
const Users = require("../models/user");

module.exports = async (req, res, next) => {
    // console.log("check authentication");

    const token = req.cookies.token;
    if (!token) return res.status(404).json({
        quick: "Login Required..!",
        message: "Login to access more...",
        code: "NL"
    });
    try {
        //decode token to get the user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const searchUser = await Users.findById(decoded.userId)

        if (!searchUser) {
            return res.status(404).json({
                quick: "Invalid User!",
                message: "User Not Found...",
                code: "NU"
            });
        }
        // console.log(searchUser);
        req.user = decoded.userId;
       console.log(req.user)
        next();
    } catch (e) {
        console.log(e)
    }
}