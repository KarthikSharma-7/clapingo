const teacherModel = require("../../db/teacher");
const studentModel = require("../../db/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ Error: "All fields required" });
  }
  if (role.toLowerCase() === "student" || role.toLowerCase() === "teacher") {
    if (role.toLowerCase() === "student") {
      const student = await studentModel.findOne({ email });
      if (!student) {
        return res.status(401).json({ Error: "Invalid student" });
      }
      const value = await bcrypt.compare(password, student.password);
      if (value) {
        const token = jwt.sign({ _id: student._id }, process.env.JWT_key);
        const { _id, name, email } = student;
        res
          .status(200)
          .json({ Success: "Logged in", token, User: { _id, name, email } });
      } else {
        return res.status(401).json({ Error: "Wrong Credentials" });
      }
    } else if (role.toLowerCase() === "teacher") {
      const teacher = await teacherModel.findOne({ email });
      if (!teacher) {
        return res.status(401).json({ Error: "Invalid teacher" });
      }
      const value = await bcrypt.compare(password, teacher.password);
      if (value) {
        const token = jwt.sign({ _id: teacher._id }, process.env.JWT_key);
        const { _id, name, email } = teacher;
        res
          .status(200)
          .json({ Success: "Logged in", token, User: { _id, name, email } });
      } else {
        return res.status(401).json({ Error: "Wrong Credentials" });
      }
    } else {
      return res.status(401).json({ Error: "Invalid user" });
    }
  } else {
    return res.status(400).json({ Error: "Invalid role" });
  }
};

module.exports = login;
