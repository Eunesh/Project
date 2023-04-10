const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminSchema");

const AdminAuthenticate = async (req, res, next) => {
  try {
    const admin_token = req.cookies.admintoken;
    const verifyToken = jwt.verify(admin_token, process.env.SECRET_KEY_ADMIN);

    const rootAdmin = await Admin.findOne({
      _id: verifyToken._id,
      "tokens.token": admin_token,
    });

    req.userID = rootAdmin._id;

    if (verifyToken) {
      next();
    }
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(err);
  }
};

module.exports = AdminAuthenticate;
