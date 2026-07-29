import express from "express";



import Users from "../models/user";
import { sendemailChangeOTP } from "../utils/sendEmail.js";

const router = express.Router({ mergeParams: true });


//add authentication later
router.post("/email-change", async (req, res) => {
    const { currentEmail, newEmail } = req.body;
    console.log("old     new", currentEmail, newEmail);


    const userExist = await Users.findOne({ email: currentEmail })
    console.log(userExist);


    const newEmailCheck = await Users.find({ email: newEmail });
    console.log(newEmailCheck)


    if (userExist && newEmailCheck.length === 0) {
        //send OTP to the new email and return id otp not send "failed"
        console.log("enter here")

        const firstName = userExist.username.split(" ");
        const otp = Math.floor(100000 + Math.random() * 900000);

        const info = await sendemailChangeOTP(
           newEmail,
            firstName[0],
            otp
        );
        console.log("otp send")
        if (info.accepted.length === 0) {
            // await PendingSignup.deleteOne({ email })
            res.status(500).json({
                message: "Failed to send OTP email.",
                code: "failed",
            });
        }

        return res.status(200).json({
            message: `OTP send to ${newEmail}`,
            code: "successful",
        });

    }
    console.log("logic failed")

})

export default router;