const axios = require("axios");
const { Band, Transaction } = require("../models/");

class transactionController {
  static reqSnap = async (req, res, next) => {
    try {
      const decoded = req.decoded;
      const { name, location, date, duration, bandId } = req.query;
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
      let snapToken = snapResp.data.token;
      await Transaction.create({
        name,
        address: location,
        BandId: bandId,
        UserId: decoded.id,
        date: new Date(date),
        duration: +duration,
        snapToken,
        status: "pending",
      });
      res.status(201).json({ snapToken });
    } catch (error) {
      next(error);
    }
  };

  static reviewRating(req, res, next) {
    const id = req.params.id;
    const { rating, review } = req.body;

    Transaction.findOne({ where: { id } })
      .then((data) => {
        if (!data) {
          throw { name: "customError", status: 404, message: "Data not found" };
        }
        if (data.UserId === req.decoded.id) {
          return Transaction.update({ rating, review }, { where: { id } });
        } else {
          throw {
            name: "customError",
            status: 401,
            message: "Unauthorize access",
          };
        }
      })
      .then((_) => {
        res.status(200).json({ message: "Success give rating & review" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTransactionById(req, res, next) {
    const bandId = req.params.bandId;
    Transaction.findAll({ where: { BandId: bandId } })
      .then((transactions) => {
        res.status(200).json({ transactions });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTransactionByUserId(req, res, next) {
    const UserId = req.decoded.id;
    Transaction.findAll({ where: { UserId }, include: [Band] })
      .then((Transactions) => {
        if (Transactions.length === 0) {
          throw { name: "customError", status: 404, message: "Data not found" };
        }
        res.status(200).json({ Transactions });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateStatus(req, res, next) {
    const { status, snapToken } = req.body;
    Transaction.update({ status }, { where: { snapToken } })
      .then((_) => {
        res.status(200).json({ message: "Success update status" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = transactionController;
