const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

adminSchema.methods.generateAuthTokenAdmin = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_ADMIN);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Admin = mongoose.model("ADMIN", adminSchema);

module.exports = Admin;
