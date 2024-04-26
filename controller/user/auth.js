const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  try {
    const data = await User.findOne({ name: username });

    if (data) {
      res.send("USer Already Exists");
    } else {
      const newUser = new User({
        name: username,
        password: password,
      });
      console.log(newUser);

      await newUser.save();
      res.json({ message: "User created successfully" });
    }
  } catch (e) {
    res.send(e.message);
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
        console.log(token);
        res.json(token);
      } else {
        res.send("invalid Password");
      }
    } else {
      res.send("NO such user exists");
    }
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = {
  signup,
  signin,
};
