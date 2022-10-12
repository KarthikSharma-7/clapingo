const jwt = require("jsonwebtoken");
const { Model } = require("mongoose");
require("dotenv").config();
const studentModel = require("../../db/student");
const teacherModel = require("../../db/teacher");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const role = req.body.role;
  if (!authorization) {
    return res.status(401).json({ Error: "Login required" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_key, async (err, payload) => {
    if (err) {
      return res.staus(401).json({ Error: "Login required to access" });
    }
    if (role.toLowerCase() === "student" || role.toLowerCase() === "teacher") {
      const { _id } = payload;
      if (role.toLowerCase() === "student") {
        try {
          student = await studentModel.findOne({ _id });
          student.password = undefined;
          student.cpassword = undefined;
          req.user = student;
          next();
        } catch (err) {
          return res.status(400).json({ Error: "Invalid user" });
        }
      } else {
        try {
          teacher = await teacherModel.findOne({ _id });
          teacher.password = undefined;
          teacher.cpassword = undefined;
          req.user = teacher;
          next();
        } catch (err) {
          return res.status(400).json({ Error: "Invalid user" });
        }
      }
    } else {
      return res.status(401).json({ Error: "Invalid role" });
    }
  });
};

module.exports = auth;
