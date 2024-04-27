const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const username = req.user.username;
  try {
    const data = await User.findOne({ name: username });
    if (data) {
      next();
    } else {
      res.json({ msg: "NO such user exists" });
    }
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
}

module.exports = {
  userMiddleware,
};
