const jwt = require("jsonwebtoken");
const { Admin } = require("../../db");
const jwtPassword = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = await Admin.findOne({ username: username });

  if (!data) {
    const newAdmin = new Admin({
      username: username,
      password: password,
    });
    await newAdmin.save();
    res.json({ msg: "Admin created successfully" });
  } else {
    res.status(400).json({
      msg: "Admin Already Exists",
    });
  }
};

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const data = await Admin.findOne({ username: username });
    if (data) {
      if ((data.password = password)) {
        var token = jwt.sign({ username: username }, jwtPassword);
        res.json(token);
      }
    } else {
      res.status(400).json({
        msg: "No Such User Exists",
      });
    }
  } catch (e) {
    res.status(400).json({
      msg: e.message,
    });
  }
};

module.exports = {
  signup,
  signin,
};
