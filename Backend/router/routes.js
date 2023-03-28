const jwt = require("jsonwebtoken");
const express = require("express");
const cron = require("node-cron");
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");
const membersInformation = require("../models/MembersInfoSchema");
const Payment_information = require("../models/paymentSchema");
const trainerSchema = require("../models/TrainersSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/Authenticate");
const cookieParser = require("cookie-parser");
const axios = require("axios");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("Hellow from server");
});

// User Register
router.post("/register", async (req, res) => {
  const { name, email, password, confirm_password, checkboxField } = req.body; //

  // console.log(checkboxField);

  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Empty" });
    }

    const userExist = await User.findOne({ email: email });
    const trainerExist = await trainerSchema.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }
    if (trainerExist) {
      return res.status(422).json({ error: "Trainer Email already Exist" });
    }

    if (checkboxField === false) {
      const user = new User({ name, email, password });
      const userRegister = await user.save();

      if (userRegister) {
        res.status(200).json({ message: "user registered successfuly" });
      }
    }
    if (checkboxField === true) {
      const user = new trainerSchema({ name, email, password });
      const trainerRegister = await user.save();

      if (trainerRegister) {
        res.status(202).json({ message: "Trainer registered successfuly" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    const trainerLogin = await trainerSchema.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password); //comparing Password in database and password we get after login from user
      if (isMatch) {
        const token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.status(200).json({ message: "Login sucessfull" });
      } else {
        res.status(400).json({ message: "Invalid Crediantials" });
      }
    }
    // For Trainer Login
    else if (trainerLogin) {
      const isMatch = await bcrypt.compare(password, trainerLogin.password); //comparing Password in database and password we get after login from trainer
      // const isVerified = trainerLogin.isVerified
      // console.log(isVerified)
      if (isMatch) {
        const token = await trainerLogin.generateAuthTokenTrainer();

        res.cookie("trainertoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.status(201).json({ message: " Trainer Login sucessfull" });

        //console.log(token);
      } else {
        res.status(400).json({ message: "Invalid Crediantialss" });
      }
    } else {
      res.status(400).json({ message: "Invalid Crediantialss" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  For Membership Page, Checking if user is login or not
router.get("/membership", authenticate, (req, res) => {
  //res.send("Hellow from membership side")
  res.send(req.rootUser);
});

//For Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("UserLogout");
});

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
        const user = await axios.put(
          "https://api.chatengine.io/users/",
          { username: username, secret: username, first_name: username },
          { headers: { "Private-key": "6a434c03-1b1c-4f22-89e9-122e1c156410" } }
        );

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

// router.post('/membershipInfo', authenticate, async (req, res)=>{
//     try {
//         const { firstName, lastName, phoneNumber, age, address } = req.body;
//         const paymentChecking = await User.findOne({_id: req.userID});
//         console.log(paymentChecking.payments.length);

//         if (paymentChecking.payments.length > 0) {
//             const members_Information = new membersInformation({ firstName, lastName, phoneNumber, age, address });
//             const membersinfo = await members_Information.save()

//             if (membersinfo) {
//                 // const authObject = {'Project-ID': "01a1f814-6792-49a6-acf0-2485658a8ed0", 'User-Name':firstName, 'User-Secret':firstName};
//                 // const res = await axios.post("https://api.chatengine.io/chats/152154/people/", {headers: authObject} );

//                 // Creating that member user in our chat after they join our membership
//                 const user = await axios.put("https://api.chatengine.io/users/",
//                  {username:firstName, secret: firstName, first_name: firstName},
//                  {headers: {'Private-key':"6a434c03-1b1c-4f22-89e9-122e1c156410"}}
//                 )

//              // Placing that newly created User into Trainer chat

//                 res.status(200).json({ message: "You have successfully joined our gym membership" });
//             }
//             } else {
//                 res.status(404).json({ message: "You need to complete your payment" });
//              }

//         // deleting payments field after Membership expired.
//         const deleteExpiredMembership = async ()=>{
//             const activePayments = paymentChecking.payments.filter(payment => payment.MembershipEnd >= new Date());
//             // If all the payments have expired, delete the payments array
//             if (activePayments.length === 0) {
//                 paymentChecking.payments = [];
//               }
//             await paymentChecking.save()
//         }

//         // Schedule the function to run daily at midnight
//          cron.schedule('* * * * *', deleteExpiredMembership);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

router.get("/checkMembership", authenticate, async (req, res) => {
  try {
    const membershipChecking = await User.findOne({ _id: req.userID });
    // console.log(membershipChecking)

    if (membershipChecking.isPaid === false) {
      res.status(205).json({ message: "Membership ended" });
    } else {
      res.status(206).json({ message: "Membership not ended" });
    }
  } catch (err) {
    console.log(err);
  }
});

// router.get('/startedmembership', authenticate , async (req,res)=>{
//     const paymentChecking = await User.findOne({_id: req.userID});

//     if (paymentChecking.payments.length > 0) {
//         res.status(201).json({ message: "Payment Found " });

//     }
// })

module.exports = router;
