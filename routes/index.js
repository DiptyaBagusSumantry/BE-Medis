const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const MedicineController = require("../controllers/MedicineController.js");
const PatientController = require("../controllers/PatientController.js");
const RekamMedisController = require("../controllers/RekamMedisContoller.js");
const TransactionController = require("../controllers/TransactionController.js");

const { IsAdmin } = require("../middlewares/chekRole.js");

router.post("/login", AuthController.Login);
router.post("/logout", verifyToken, AuthController.Logout);
router.get("/fetch", verifyToken, AuthController.Fetch);

//medicine
router.post(
  "/medicine",
  verifyToken,
  IsAdmin,
  MedicineController.createMedicine
);
router.get("/medicine", verifyToken, IsAdmin, MedicineController.getMedicine);
router.get("/medicine/:id", verifyToken, IsAdmin, MedicineController.getDetailMedicine);
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

//patient
router.post("/patient", verifyToken, IsAdmin, PatientController.createPatient);
router.get("/patient", verifyToken, IsAdmin, PatientController.getPatient);
router.get("/patient/:id", verifyToken, IsAdmin, PatientController.detailPatient);
router.put("/patient/:id", verifyToken, IsAdmin, PatientController.updatePatient);
router.delete("/patient/:id", verifyToken, IsAdmin, PatientController.deletePatient);

//Rekam Medis
router.post(
  "/rekam-medis",
  verifyToken,
  IsAdmin,
  RekamMedisController.createRekamMedis
);
router.get("/rekam-medis", verifyToken, IsAdmin, RekamMedisController.getRM);
router.get(
  "/rekam-medis/:id",
  verifyToken,
  IsAdmin,
  RekamMedisController.getDetailRM
);

//Invoice
router.get("/invoice", verifyToken, IsAdmin, TransactionController.getInvoice);
router.put(
  "/invoice/:id",
  verifyToken,
  IsAdmin,
  TransactionController.updateInvoice
);

module.exports = router;
