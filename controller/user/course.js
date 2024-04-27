const { User, Course } = require("../../db");

const purchaseCourse = async (req, res) => {
  const id = req.params.courseId;
  const users = req.user.username;

  try {
    const course = await Course.findById(id);
    const user = await User.findOne({ name: users });

    if (!course) {
      res.send("No such course Found");
    }
    if (!user) {
      res.send("No such user found");
    }
    course.enrolled.push(user);
    user.courses.push(course);

    await course.save();
    await user.save();

    res.send("USer Enrolled in Course");
  } catch (e) {
    res.send(e);
  }
};

const myCourses = async (req, res) => {
  try {
    const name = req.user.username;
    const user = await User.findOne({ name: name });

    if (!user) {
      res.send("no such user");
    }

    const data = await Course.find(
      {
        enrolled: user,
      },
      { enrolled: 0 }
    );

    res.json(data);
  } catch (e) {
    res.json({ msg: e.message });
  }
};

module.exports = {
  purchaseCourse,
  myCourses,
};
