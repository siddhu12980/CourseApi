const mongoose = require("mongoose");

// Connect to MongoDB
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_SET = process.env.DB_SET;

// Construct MongoDB URL from environment variables
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}.${DB_NAME}/?${DB_SET}`;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define schemasz
mongoose.set("strictQuery", false);

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageurl: String,

  time: { type: Date, default: Date.now() },

  creator: String,

  enrolled: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
