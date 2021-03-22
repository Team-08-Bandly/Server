const nodemailer = require("nodemailer");

function server(obj) {
  //Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  //Step 2
  let mailOptions = {
    from: "helsinkibatch08@gmail.com",
    to: `${obj.email}`,
    subject: "Registrasi Berhasil",
    text: `Selamat, anda telah berhail registrasi di website Camera Memory dengan email: ${obj.email}`,
  };

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  //Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}

module.exports = server;
