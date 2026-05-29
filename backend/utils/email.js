const { Resend } = require("resend");
const env = require("../config/env");

const resend = new Resend(env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: env.FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email send error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log(`📧 Email sent to ${to}: ${data.id}`);
    return data;
  } catch (err) {
    console.error("Email utility error:", err.message);
    throw err;
  }
};

module.exports = { sendEmail };
