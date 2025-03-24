const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to another email service
  auth: {
    user: "nishikamishra422@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your app password (not your actual email password)
  },
});

// Define the mail options
const mailOptions = {
  from: "nishikamishra422@gmail.com",
  to: "lakhanpalsaanvi26@gmail.com",
  subject: "Test Email from Node.js",
  text: "Hello! This is a test email sent using Nodemailer.",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
