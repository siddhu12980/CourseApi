const { Router } = require("express");
const { purchaseCourse, myCourses } = require("../../controller/user/course");
const userCourseRouter = Router();

userCourseRouter.post("/courses/:courseId", purchaseCourse);

userCourseRouter.get("/courses", myCourses);

module.exports = userCourseRouter;
