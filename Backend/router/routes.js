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

// verify Trainers
// router.post("/varifyTrainers", async (req, res) => {
//   const { id } = req.body;
//   const trainerDetails = await trainerSchema.findOne({ _id: id });
//   console.log(trainerDetails.isVerified);

//   if (trainerDetails.isVerified === false) {
//     await trainerSchema.updateOne({ _id: id }, { $set: { isVerified: true } });
//   }
// });

//  For Membership Page, Checking if user is login or not
router.get("/membership", authenticate, (req, res) => {
  //res.send("Hellow from membership side")
  res.send(req.rootUser);
});

// router.get("/trainersData", async (req, res) => {
//   try {
//     const trainersData = await trainerSchema.find();
//     res.send(trainersData);

//     const id = req.query.id;
//     // console.log(id);
//     const trainerDetails = await trainerSchema.findOne({ _id: id });
//     if (trainerDetails.isVerified === false) {
//       const update = await trainerSchema.updateOne(
//         { _id: id },
//         { $set: { isVerified: true } }
//       );

//       if (update) {
//         res.status(201).send("Trainer is Verified");
//       }
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });

//For Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("UserLogout");
});

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
