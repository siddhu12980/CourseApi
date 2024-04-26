const { Router } = require("express");
const {
  CreateCourse,
  getAdminCourse,
} = require("../../controller/admin/course");

const adminCourseRouter = Router();

adminCourseRouter.post("/courses", CreateCourse);

adminCourseRouter.get("/courses", getAdminCourse);

module.exports = { adminCourseRouter };
