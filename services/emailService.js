const sendGrid = require("@sendgrid/mail");

sendGrid.setApiKey(process.env.S_KEY);
const sendEmail = async (options) => {
  const msg = {
    to: options.email,
    from: process.env.EMAIL,
    subject: "Password Reset Token",
    text: options.resetToken,
  };
  sendGrid
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
