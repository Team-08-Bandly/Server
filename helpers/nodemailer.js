const nodemailer = require("nodemailer");

async function server(obj) {
  //Step 1
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  const { email, nameUser, nameBand, payment, location, date } = obj;

  //Step 2
  let mailOptions = await {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Pemesanan Berhasil",
    text: `Selamat ${nameUser}, anda telah berhail melakukan pemesanan kepada Band ${nameBand} dengan lokasi: ${location} pada di tanggal: ${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} dengan total biaya ${payment}`,
  };

  //Step 3
  await transporter.sendMail(mailOptions);
}

module.exports = server;
