const signup = require("./User/signup");
const auth = require("./User/auth");
const login = require("./User/login");
const favTeacher = require("./Teacher/favTeacher");
const getTeacher = require("./Teacher/getTeacher");
const mostFav = require("./Teacher/mostFav");

const controllers = {
  signup,
  auth,
  login,
  favTeacher,
  getTeacher,
  mostFav,
};

module.exports = { controllers };
