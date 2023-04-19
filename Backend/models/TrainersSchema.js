const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid password. Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.`,
    },
  },
  isVerified: {
    type: Boolean,
    default: false, // default value is false
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are hashing the password here
trainerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

//Creating token
trainerSchema.methods.generateAuthTokenTrainer = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_TRAINER);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Trainer = mongoose.model("TRAINER", trainerSchema);

module.exports = Trainer;
