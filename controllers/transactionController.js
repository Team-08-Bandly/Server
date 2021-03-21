const axios = require("axios");

class transactionController {
  static reqSnap = async (req, res, next) => {
    console.log(req.decoded, "-----------------");
    console.log(req.query, "-------------------00000");
    try {
      const { name, location, date, duration, bandId } = req.query;
      let getCurrentTimestamp = () => {
        return "" + Math.round(new Date().getTime() / 1000);
      };
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
            gross_amount: 10000,
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
      res.json({ snapToken });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = transactionController;
