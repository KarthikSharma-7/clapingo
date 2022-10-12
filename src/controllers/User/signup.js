const bcrypt = require("bcryptjs");
const teacherModel = require("../../db/teacher");
const studentModel = require("../../db/student");

const signup = async (req, res) => {
  const { name, email, phnNumber, password, cpassword, role } = req.body;
  if (!name || !email || !phnNumber || !password || !cpassword || !role) {
    return res.status(400).json({ Error: "All fields required" });
  } else if (/[^a-zA-Z]/.test(name)) {
    return res.status(400).json({ Error: "Username must be alphabets" });
  } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
    return res.status(400).json({ Error: "Enter a valid email" });
  } else if (password !== cpassword) {
    return res.status(400).json({ Error: "Passwords didn't match" });
  }
  if (role.toLowerCase() === "student" || role.toLowerCase() === "teacher") {
    if (role.toLowerCase() === "student") {
      const student = await studentModel.findOne({ email });
      if (student) {
        return res.status(400).json({ Error: "Try using another email" });
      }
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = new studentModel({
          name,
          email,
          phnNumber,
          password: hashPassword,
          cpassword,
        });
        await newStudent.save();
        res.status(201).json({ Success: "Student added" });
      } catch (err) {
        return res.status(500).json({ Error: err });
      }
    } else if (role.toLowerCase() === "teacher") {
      const teacher = await teacherModel.findOne({ email });
      if (teacher) {
        return res.status(400).json({ Error: "Try using another email" });
      }
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newTeacher = new teacherModel({
          name,
          email,
          phnNumber,
          password: hashPassword,
          cpassword,
        });
        await newTeacher.save();
        res.status(201).json({ Success: "Teacher added" });
      } catch (err) {
        return res.status(500).json({ Error: err });
      }
    } else {
      return res.status(400).json({ Error: "Invalid role" });
    }
  } else {
    return res.status(400).json({ Error: "Invalid role" });
  }
};

module.exports = signup;
