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
    res.json({ message: "Admin created successfully" });
  } else {
    res.send("user already exists");
  }
};

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const data = await Admin.findOne({ username: username });
    console.log(data);
    if (data) {
      if ((data.password = password)) {
        var token = jwt.sign({ username: username }, jwtPassword);
        res.json(token);
      }
    } else {
      res.send("No such user exists");
    }
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = {
  signup,
  signin,
};
