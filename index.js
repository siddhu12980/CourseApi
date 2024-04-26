require("dotenv").config();

require("./db/index");

const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3600;

const app = express();

//usally there is no need to login to view Courses:inreal_website
const { getallCourses } = require("./routes/courses/courses");

const { adminAuthRouter } = require("./routes/admin/auth");
const { adminCourseRouter } = require("./routes/admin/course");

const { adminMiddleware } = require("./middleware/admin");
const { userMiddleware } = require("./middleware/user");

const { userAuthRouter } = require("./routes/user/auth");
const userCourseRouter = require("./routes/user/course");

const { jwtverify } = require("./middleware/jwtverify");

// Middleware for parsing jsoon
app.use(bodyParser.json());

app.use("/admin", adminAuthRouter);

app.use("/admin", jwtverify, adminMiddleware, adminCourseRouter);

app.use("/user", userAuthRouter);
app.use("/user", jwtverify, userMiddleware, userCourseRouter);

app.use("/courses", getallCourses);

app.use("*", (req, res) => {
  res.json({
    msg: "invalid url",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
