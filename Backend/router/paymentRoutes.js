const express = require("express");
const cron = require("node-cron");
const router = express.Router();
const User = require("../models/userSchema");
require("../db/conn");
const axios = require("axios");
const authenticate = require("../middleware/Authenticate");

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
    console.log(res.data.user.name);
    console.log(String(res.data.amount));
    console.log(res.status);

    if (res.status === 200) {
      const payment_details = res.data.user.name;
      const amountPaid = res.data.amount;

      const exactUser = await User.findOne({ _id: req.userID });
      // console.log(exactUser);
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
        //Saving  payment details to Users database
        // const sendPayment = await exactUser.addPaymen(payment_details, amountPaid, type);
        // await exactUser.save();

        // Creating that member user in our chat after they done payment
        // const user = await axios.put(
        //   "https://api.chatengine.io/users/",
        //   { username: username, secret: username, first_name: username },
        //   { headers: { "Private-key": "6a434c03-1b1c-4f22-89e9-122e1c156410" } }
        // );

        // //Adding that created member in TrainerChatroom
        // await axios.put("https://api.chatengine.io/chats/152154/people/",
        // {headers: {'Project-ID':"01a1f814-6792-49a6-acf0-2485658a8ed0",'User-Name':username, 'User-Secret':username }}

        // )

        response.status(201).send("Payment Successfull"); //
      } else {
        response.status(400).send("Payment UnSuccessfull");
      }

      // deleting payments field after  expired.
      const deleteExpiredPayment = async () => {
        const activePayment = exactUser.payments.filter(
          (payment) => payment.MembershipEnd >= new Date()
        );
        //console.log(activePayment);
        // If all the payments have expired, delete the payments array
        if (activePayment.length === 0) {
          //exactUser.payments = [];
          await User.updateOne(
            { _id: req.userID },
            { $set: { isPaid: false } }
          );
        }
        //await exactUser.save()
      };

      // Schedule the function to run daily at midnight
      cron.schedule("* * * * *", deleteExpiredPayment);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
