import { render } from "@react-email/render";
import transporter from "../config/mail.js";
import SignupOTP from "../emails/singupOTP.jsx";
import changeEmailOTP from "../emails/changeEmailOTP.jsx";


export async function sendSignupOTP(email, username, otp) {
    const html = await render(
        SignupOTP({
            username,
            otp,
        })
    );

   return await transporter.sendMail({
        from: `"BiteBox_Accounts" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `${otp} - is your BiteBox verification code`,
        html,
    });
}
export async function sendemailChangeOTP(email, username, otp) {
    const html = await render(
        changeEmailOTP({
            username,
            otp,
        })
    );

   return await transporter.sendMail({
        from: `"BiteBox_Accounts" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `${otp} - is your changing email code`,
        html,
    });
}