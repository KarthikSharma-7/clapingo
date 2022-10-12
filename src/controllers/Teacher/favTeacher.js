const studentModel = require("../../db/student");
const teacherModel = require("../../db/teacher");

const favTeacher = async (req, res) => {
  if (req.body.role.toLowerCase() === "student") {
    const student = req.user._id;
    const teacher = await teacherModel.findOne({
      _id: req.params.id,
      optedStudents: student,
    });
    if (teacher == null) {
      await teacherModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { optedStudents: student } }
      );
      res.status(201).json({ Message: "Fav teacher added" });
    } else {
      return res.status(400).json({ Message: "Already added" });
    }
  } else {
    return res.status(400).json({ Error: "Invalid user role" });
  }
};

module.exports = favTeacher;
