const router = require('express').Router();
const verifyToken = require("../middlewares/VerifyToken");
// const AdminController = require('../controllers/UserController.js');


const { IsAdmin } = require('../middlewares/chekRole.js')

// router.get('/count-dashboard', verifyToken, IsAdmin, DashboardController.countDashboard )

module.exports = router
