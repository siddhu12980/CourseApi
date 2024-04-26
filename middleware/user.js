const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const username = req.user.username;
  try {
    const data = await User.findOne({ name: username });
    console.log(data);
    if (data) {
      next();
    } else {
      res.send("NO such user exists");
    }
  } catch (e) {
    res.send(e.message);
  }
}

module.exports = {
  userMiddleware,
};
