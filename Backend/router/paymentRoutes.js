const express = require("express");
const cron = require("node-cron");
const router = express.Router();
const User = require("../models/userSchema");
require("../db/conn");
const axios = require("axios");
const authenticate = require("../middleware/Authenticate");
const nodemailer = require("nodemailer");

// for khalti payment verification, adding payment details in our database and creating that user chat profile
router.post("/verify_payment", authenticate, async (req, response) => {
  try {
    const { token, amount } = req.body;
    let data = {
      token: token,
      amount: amount,
    };

    let config = {
      headers: {
        Authorization: "Key test_secret_key_5c35ed14b804428b87fcc547855605b6",
      },
    };

    const res = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      data,
      config
    );

    if (res.status === 200) {
      const payment_details = res.data.user.name;
      const amountPaid = res.data.amount;

      const exactUser = await User.findOne({ _id: req.userID });
      await User.updateOne({ _id: req.userID }, { $set: { isPaid: true } });
      const username = exactUser.name;

      if (exactUser) {
        if (amountPaid === 10000) {
          const Type = "Basic";
          const sendPayment = await exactUser.addPaymen(
            payment_details,
            amountPaid,
            Type
          );
          await exactUser.save();
        } else if (amountPaid === 20000) {
          const Type = "Premium";
          const sendPayment = await exactUser.addPaymen(
            payment_details,
            amountPaid,
            Type
          );
          await exactUser.save();
        } else if (amountPaid === 15000) {
          const Type = "Standered";
          const sendPayment = await exactUser.addPaymen(
            payment_details,
            amountPaid,
            Type
          );
          await exactUser.save();
        }

        //Creating that member user in our chat after they done payment
        const user = await axios.put(
          "https://api.chatengine.io/users/",
          { username: username, secret: username, first_name: username },
          { headers: { "Private-key": "d340a46e-8e2d-4150-8b5b-b7467b50662c" } }
        );

        response.status(201).send("Payment Successfull"); //
      } else {
        response.status(400).send("Payment UnSuccessfull");
      }

      // deleting payments field after  expired.
      const deleteExpiredPayment = async () => {
        const activePayment = exactUser.payments.filter(
          (payment) => payment.MembershipEnd >= new Date()
        );
        if (activePayment.length === 0) {
          await User.updateOne(
            { _id: req.userID },
            { $set: { isPaid: false } }
          );
        }
      };

      // Schedule the function to run every minute
      cron.schedule("* * * * *", deleteExpiredPayment);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
