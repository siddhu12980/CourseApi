const jwt = require("jsonwebtoken");

async function jwtverify(req, res, next) {
  const bearer = req.headers["authorization"];

  if (!bearer) {
    res.json({
      msg: "No Auth Header",
    });
  }

  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      res.json({
        msg: "No Token Provided",
      });
    }
    const decode = jwt.verify(token, "sshh");
    req.user = decode;
    console.log(decode);
    next();
  } catch (e) {
    console.log(e);
    res.json({
      msg: "Token not valid",
    });
  }
}

module.exports = {
  jwtverify,
};
