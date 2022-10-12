const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phnNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  optedStudents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

const teacherModel = new mongoose.model("Teacher", teacherSchema);

module.exports = teacherModel;
