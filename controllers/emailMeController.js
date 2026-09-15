import nodemailer from "nodemailer";

export async function CreateEmail(req, res) {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Email, subject, and message are required.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject,
      text: message,
    });

    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error while sending mail:", err);
    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Unable to send email."
          : err.response || err.message || "Unable to send email.",
    });
  }
}
