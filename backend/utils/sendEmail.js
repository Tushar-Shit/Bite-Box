// import { render } from "@react-email/render";
// import transporter from "../config/mail.js";
// import SignupOTP from "../emails/singupOTP.jsx";
// import changeEmailOTP from "../emails/changeEmailOTP.jsx";

// export async function sendSignupOTP(email, username, otp) {
//   console.log("EMAIL_USER:", process.env.EMAIL_USER);
//   console.log("Sending email to:", email);

//   const html = await render(
//     SignupOTP({
//       username,
//       otp,
//     })
//   );

//   try {
//     const info = await transporter.sendMail({
//       from: `"BiteBox Accounts" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: `${otp} - is your BiteBox verification code`,
//       html,
//     });

//     console.log("Mail sent:", info);
//     return info;
//   } catch (err) {
//     console.error("Mail error:", err);
//     throw err;
//   }
// }



// export async function sendemailChangeOTP(email, username, otp) {
//     const html = await render(
//         changeEmailOTP({
//             username,
//             otp,
//         })
//     );

//     return await transporter.sendMail({
//         from: `"BiteBox_Accounts" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: `${otp} - is your changing email code`,
//         html,
//     });
// }



















async function sendEmail(to, subject, message) {
  try {
    const response = await fetch(process.env.GOOGLE_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to connect to Google Apps Script");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Email sending failed");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export default sendEmail;