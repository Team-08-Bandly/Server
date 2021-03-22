const axios = require("axios");
const { Band, Transaction } = require("../models/");

class transactionController {
  static reqSnap = async (req, res, next) => {
    try {
      const decoded = req.decoded;
      const { name, location, date, duration, bandId } = req.query;
      console.log(new Date(date));
      let getCurrentTimestamp = () => {
        return "" + Math.round(new Date().getTime() / 1000);
      };
      let band = await Band.findByPk(+bandId);
      let snapResp = await axios({
        url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic " +
            Buffer.from("SB-Mid-server-hrPFTY_gPDnF0eszAt22Pbpq").toString(
              "base64"
            ),
        },
        data: {
          transaction_details: {
            order_id: "order-csb-" + getCurrentTimestamp(),
            gross_amount: band.rate * +duration,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: name,
            // last_name: 'Kane',
            email: req.decoded.email,
            // phone: '08111222333'
          },
        },
      });
      await Transaction.create({
        name,
        address: location,
        BandId: bandId,
        UserId: decoded.id,
        date: new Date(date),
        duration: +duration,
      });
      let snapToken = snapResp.data.token;
      res.json({ snapToken });
    } catch (error) {
      next(error);
    }
  };

  static reviewRating(req, res, next) {
    const bandId = req.params.bandId;
    const { rating, review } = req.body;
    Transaction.update({ rating, review }, { where: { BandId: bandId } })
      .then((data) => {
        console.log(data);
        if (data[0] === 0) {
          throw { name: "customError", status: 404, message: "Data not found" };
        }
        res.status(200).json({ message: "Success give rating & review" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = transactionController;
