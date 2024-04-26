const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  const username = req.user.username;
  try {
    const data = await Admin.findOne({ username: username });
    console.log(data);
    if (data) {
      next();
    } else {
      console.log("no such user exists");
    }
  } catch (e) {
    res.send(e.message);
  }
}

module.exports = {
  adminMiddleware,
};
