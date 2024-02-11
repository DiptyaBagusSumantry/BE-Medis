const router = require('express').Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
// const AdminController = require('../controllers/UserController.js');


const { IsAdmin } = require('../middlewares/chekRole.js')

router.post("/login", AuthController.Login);
// router.get('/count-dashboard', verifyToken, IsAdmin, DashboardController.countDashboard )

module.exports = router
