async function sendEmail(to, subject, html) {
  try {
    const response = await fetch(process.env.GOOGLE_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
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
async function sendResetEmail(to, subject, html) {
  try {
    const response = await fetch(process.env.GOOGLE_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
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
export { sendResetEmail };
export default sendEmail;