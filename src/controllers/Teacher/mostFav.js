const teacherModel = require("../../db/teacher");

const mostFav = (req, res) => {
  teacherModel
    .find()
    .sort({ optedStudents: -1 })
    .exec((err, payload) => {
      if (err) {
        return res.status(400).json({ Error: err });
      } else {
        const favTeacher = payload[0];
        favTeacher.password = undefined;
        favTeacher.cpassword = undefined;
        favTeacher.email = undefined;
        favTeacher.optedStudents = undefined;
        res.status(200).json({ FavourateTeacher: favTeacher });
      }
    });
};

module.exports = mostFav;
