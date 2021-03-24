const nodemailer = require("nodemailer");
const convertRupiah = require("./convertRupiah");
function server(obj) {
  //Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  const { email, nameUser, nameBand, payment, location, date } = obj;
  let total = convertRupiah(payment);
  //Step 2
  let mailOptions = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Pemesanan Berhasil",
    text: `Selamat ${nameUser}, anda telah berhail melakukan pemesanan kepada Band ${nameBand} dengan lokasi: ${location} pada di tanggal: ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} dengan total biaya ${total}`,
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
