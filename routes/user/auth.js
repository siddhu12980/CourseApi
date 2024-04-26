const { Router } = require("express");
const { signup, signin } = require("../../controller/user/auth");
const userAuthRouter = Router();

userAuthRouter.post("/signup", signup);

userAuthRouter.post("/signin", signin);

module.exports = {
  userAuthRouter,
};
