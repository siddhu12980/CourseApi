const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  const username = req.user.username;
  try {
    const data = await Admin.findOne({ username: username });

    if (data) {
      next();
    } else {
      res.status(401).json({
        msg: "No such user exists",
      });
    }
  } catch (e) {
    res.json({
      msg: e.message,
    });
  }
}

module.exports = {
  adminMiddleware,
};
