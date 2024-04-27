const { Course, Admin } = require("../../db");

const CreateCourse = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const img = req.body.imageLink;

  const uname = req.user.username;

  try {
    const course1 = new Course({
      title: title,
      description: description,
      price: price,
      imageurl: img,
      creator: uname,
    });

    const c1 = await course1.save();

    const data = await Admin.findOne({ username: uname });

    data.courses.push(c1);
    await data.save();

    res
      .status(201)
      .json({ message: "Course created successfully", courseId: c1.id });
  } catch (e) {
    res.status(400).json({
      msg: e.message,
    });
  }
};

const getAdminCourse = async (req, res) => {
  const uname = req.user.username;

  try {
    const data = await Course.find(
      {
        creator: uname,
      },
      {
        __v: 0,
      }
    );
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({
        msg: "DB Error",
      });
    }
  } catch (e) {
    res.status(400).json({
      msg: e.message,
    });
  }
};

module.exports = {
  CreateCourse,
  getAdminCourse,
};
