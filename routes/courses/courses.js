const { Router } = require("express");
const { Course } = require("../../db");

const getallCourses = Router();

getallCourses.get("/", async (req, res) => {
  try {
    const data = await Course.find({}, { enrolled: 0, __v: 0 });
    res.json(data);
  } catch (e) {
    res.json({ msg: e.message });
  }
});

module.exports = {
  getallCourses,
};
