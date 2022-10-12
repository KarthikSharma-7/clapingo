const router = require("express").Router();
const { controllers } = require("../controllers/index");

router.post("/login", controllers.login);
router.post("/signup", controllers.signup);
router.get("/getTeachers", controllers.auth, controllers.getTeacher);
router.put("/addFav/:id", controllers.auth, controllers.favTeacher);
router.get("/mostFav", controllers.auth, controllers.mostFav);

module.exports = router;
