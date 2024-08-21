const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const data = await User.findOne({ name: username });

    if (data) {
      res.status(400).json({
        msg: "USer Already Exists",
      });
    } else {
      const newUser = new User({
        name: username,
        password: password,
      });

      await newUser.save();
      res.json({ msg: "User created successfully" });
    }
  } catch (e) {
    res.status(400).json({
      msg: e.message,
    });
  }
};

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const data = await User.findOne({ name: username });

    if (data) {
      if (data.password == password) {
        const token = jwt.sign({ username: username }, jwtPassword);
        res.json(token);
      } else {
      }
    } else {
      res.json({ msg: "No Such User Exists" });
    }
  } catch (e) {
    res.json({ msg: e.message });
  }
};

module.exports = {
  signup,
  signin,
};
