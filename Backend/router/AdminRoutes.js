const express = require("express");
const router = express.Router();
require("../db/conn");
const Admin = require("../models/AdminSchema");
const AdminAuthenticate = require("../middleware/AdminAuthenticate");
const bcrypt = require("bcryptjs");

router.post("/AdminRegister", async (req, res) => {
  const { username, password } = req.body;
  const admin = new Admin({ username, password });
  const AdminRegister = await admin.save();

  if (AdminRegister) {
    res.status(200).json({ message: "admin registered successfuly" });
  }
});

router.post("/AdminPasswordUpdate", AdminAuthenticate, async (req, res) => {
  const { current_password, new_password } = req.body;
  try {
    const adminChecking = await Admin.findOne({ _id: req.userID });
    if (adminChecking) {
      const isMatch = await bcrypt.compare(
        current_password,
        adminChecking.password
      );

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        // updating password here
        const update = await Admin.updateOne(
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

// checking if admin is logged in or not
router.get("/adminAuthentication", AdminAuthenticate, async (req, res) => {
  res.send(req.userID);
  //   res.status(200).json({ message: "Admin is Authenticate" });
});

module.exports = router;
