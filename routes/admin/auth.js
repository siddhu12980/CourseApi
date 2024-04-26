const { Router } = require("express");
const adminAuthRouter = Router();
const { signup, signin } = require("../../controller/admin/auth");

// Admin Routes
adminAuthRouter.post("/signup", signup);

adminAuthRouter.post("/signin", signin);

module.exports = {
  adminAuthRouter,
};
