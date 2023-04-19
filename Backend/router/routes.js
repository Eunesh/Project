const jwt = require("jsonwebtoken");
const express = require("express");
const cron = require("node-cron");
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");
const trainerSchema = require("../models/TrainersSchema");
const Admin = require("../models/AdminSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/Authenticate");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("Hellow from server");
});

//Register for both Users and Trainers
router.post("/register", async (req, res) => {
  const { name, email, password, confirm_password, checkboxField } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ error: "Please provide all required fields" });
    }

    const isUserExist = await User.exists({ email });
    const isTrainerExist = await trainerSchema.exists({ email });

    if (isUserExist) {
      return res.status(422).json({ error: "Email already exists as a user" });
    }

    if (isTrainerExist) {
      return res
        .status(422)
        .json({ error: "Email already exists as a trainer" });
    }

    if (!checkboxField) {
      const newUser = await User.create({ name, email, password });
      res.status(200).json({ message: "User registered successfully" });
    } else {
      const newTrainer = await trainerSchema.create({ name, email, password });
      res.status(202).json({ message: "Trainer registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Login for user, trainer and Admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    const trainerLogin = await trainerSchema.findOne({ email: email });
    const adminLogin = await Admin.findOne({ username: email });
    // For user Login
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
      const isMatch = await bcrypt.compare(password, trainerLogin.password); //comparing Password(hashed) in database and password we get after login from trainer
      if (isMatch && trainerLogin.isVerified === true) {
        const token = await trainerLogin.generateAuthTokenTrainer();

        res.cookie("trainertoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.status(201).json({ message: " Trainer Login sucessfull" });
      } else {
        res.status(400).json({ message: "Invalid Crediantialss" });
      }

      // For Admin Login
    } else if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);

      if (isMatch) {
        const token = await adminLogin.generateAuthTokenAdmin();

        res.cookie("admintoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.status(202).json({ message: " Admin Login sucessfull" });
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

// for checkiing if that user payment is verified or not
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

// For All the users who has register data
router.get("/usersData", async (req, res) => {
  try {
    const userData = await User.find();
    res.send(userData);
  } catch (err) {
    console.log(err.message);
  }
});

// For Deleting the Users
router.post("/deleteUser", async (req, res) => {
  const { id } = req.body;
  const userDeleted = await User.findByIdAndDelete({ _id: id });
  if (userDeleted) {
    res.status(200).json({ message: "User is deleted" });
  } else {
    res.status(404).json({ message: "UsesId not found" });
  }
  try {
  } catch (err) {}
});

// For Changing the User Password
router.post("/UserPasswordUpdate", authenticate, async (req, res) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    res.status(404).json({ message: "Please dont leave any field empty" });
  }
  try {
    const userChecking = await User.findOne({ _id: req.userID });
    if (userChecking) {
      const isMatch = await bcrypt.compare(
        current_password,
        userChecking.password
      );

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        // updating password here
        const update = await User.updateOne(
          { _id: req.userID },
          { $set: { password: hashedPassword } }
        );
        res.status(200).json({ message: "Password changed" });
      } else {
        res.status(404).json({ message: "Password didnot  matched  sorry" });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
