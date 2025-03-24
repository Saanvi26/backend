const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nishikamishra422@gmail.com", // Replace with your email
    pass: "ulfk fzzr qfys prbv", // Use your generated App Password
  }, 
  debug: true,
});

// Read and compile the email template
const source = fs.readFileSync("newsletter.html", "utf-8").toString();
const template = handlebars.compile(source);

// Optional: Add dynamic values
const replacements = {
  weekRange: "March 18 - March 24",
  upcomingContests: [
    {
      platform: "Codeforces",
      name: "Codeforces Round #900",
      date: "March 20, 2025",
      time: "18:35 UTC",
    },
    {
      platform: "LeetCode",
      name: "Weekly Contest 388",
      date: "March 22, 2025",
      time: "14:30 UTC",
    },
    {
      platform: "AtCoder",
      name: "AtCoder Beginner Contest 350",
      date: "March 23, 2025",
      time: "12:00 UTC",
    },
  ],
  unsubscribeLink: "https://www.myupdates.com/unsubscribe",
};

const htmlToSend = template(replacements);

// Define the mail options
const mailOptions = {
  from: "nishikamishra422@gmail.com",
  to: "lakhanpalsaanvi26@gmail.com",
  subject: "Weekly Coding contest updates & Report !",
  html: htmlToSend,
};

// Send the email
async function sendEmail() {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
sendEmail();
