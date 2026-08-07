import jwt from "jsonwebtoken";
import Users from "../models/user.js";
const isProduction = process.env.PROJECT_MODE === "production";
const authMiddleware = async (req, res, next) => {

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
                message: "User not found.",
                code: "NU"
            });
        }

        if (decoded.tokenVersion !== searchUser.tokenVersion) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            });

            return res.status(401).json({
                quick: "Session Expired!",
                message: "Please log in again.",
                code: "SE"
            });
        }
        req.user = decoded.userId;
        req.email = searchUser.email;
        next();
    } catch (e) {
        console.log(e)
    }
}

export default authMiddleware;