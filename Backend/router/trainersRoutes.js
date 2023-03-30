const express = require("express");
const router = express.Router();
const trainerSchema = require("../models/TrainersSchema");
require("../db/conn");

router.get("/trainersData", async (req, res) => {
  try {
    const trainersData = await trainerSchema.find();
    res.send(trainersData);
  } catch (err) {
    console.log(err.message);
  }
});

//verify Trainers
router.post("/varifyTrainers", async (req, res) => {
  try {
    const { id } = req.body;
    const trainerDetails = await trainerSchema.findOne({ _id: id });

    if (trainerDetails.isVerified === false) {
      const update = await trainerSchema.updateOne(
        { _id: id },
        { $set: { isVerified: true } }
      );

      if (update) {
        res.status(201).send("Trainer is Verified");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/removeTrainers", async (req, res) => {
  try {
    const { id } = req.body;
    const trainerDetails = await trainerSchema.findOne({ _id: id });

    if (trainerDetails.isVerified === true) {
      const update = await trainerSchema.updateOne(
        { _id: id },
        { $set: { isVerified: false } }
      );

      if (update) {
        res.status(201).send("Trainer is Removed");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
