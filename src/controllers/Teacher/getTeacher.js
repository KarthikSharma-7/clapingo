const teacherModel = require("../../db/teacher");

const getTeacher = async (req, res) => {
  const teachers = await teacherModel.find();
  teachers.map((teacher) => {
    teacher.email = undefined;
    teacher.password = undefined;
    teacher.cpassword = undefined;
  });
  res.status(200).json({ Teachers: teachers });
};

module.exports = getTeacher;
