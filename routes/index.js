const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const MedicineController = require("../controllers/MedicineController.js");

const { IsAdmin } = require("../middlewares/chekRole.js");

router.post("/login", AuthController.Login);
router.post("/logout", verifyToken, AuthController.Logout);
// router.get('/count-dashboard', verifyToken, IsAdmin, DashboardController.countDashboard )

router.post(
  "/medicine",
  verifyToken,
  IsAdmin,
  MedicineController.createMedicine
);
router.get("/medicine", verifyToken, IsAdmin, MedicineController.getMedicine);
router.put(
  "/medicine/:id",
  verifyToken,
  IsAdmin,
  MedicineController.updatetMedicine
);
router.delete(
  "/medicine/:id",
  verifyToken,
  IsAdmin,
  MedicineController.deleteMedicine
);

module.exports = router;
