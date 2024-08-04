const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const PatientController = require("../controllers/PatientController.js");
const RekamMedisController = require("../controllers/RekamMedisContoller.js");
const TransactionController = require("../controllers/TransactionController.js");

const { IsAdmin } = require("../middlewares/chekRole.js");
const ObatController = require("../controllers/ObatController.js");
const LayananController = require("../controllers/LayananController.js");
const WaController = require("../controllers/SendWa.js");
const upload = require("../middlewares/Multer.js");


router.post("/login", AuthController.Login);
router.post("/logout", verifyToken, AuthController.Logout);
router.get("/fetch", verifyToken, AuthController.Fetch);

router.post("/user-management", verifyToken, IsAdmin, AuthController.register);
router.get("/user-management", verifyToken, IsAdmin, AuthController.getUser);
router.get(
  "/user-management/:id",
  verifyToken,
  IsAdmin,
  AuthController.getUserById
);
router.put(
  "/user-management/:id",
  verifyToken,
  IsAdmin,
  AuthController.updateUser
);
router.delete(
  "/user-management/:id",
  verifyToken,
  IsAdmin,
  AuthController.deleteUser
);

//Layanan
router.post(
  "/layanan",
  verifyToken,

  LayananController.createLayanan
);
router.get("/layanan", verifyToken, LayananController.getLayanan);
router.get("/layanan/:id", verifyToken, LayananController.getDetailLayanan);
router.put("/layanan/:id", verifyToken, LayananController.updatetLayanan);
router.delete("/layanan/:id", verifyToken, LayananController.deleteLayanan);


//Obat
router.post(
  "/obat",
  verifyToken,

  ObatController.createObat
);
router.get("/obat", verifyToken, ObatController.getObat);
router.get("/obat/:id", verifyToken, ObatController.getDetailObat);
router.put("/obat/:id", verifyToken, ObatController.updatetObat);
router.delete("/obat/:id", verifyToken, ObatController.deleteObat);

//patient
router.post("/patient", verifyToken, PatientController.createPatient);
router.get("/patient", verifyToken, PatientController.getPatient);
router.get("/patient/:id", verifyToken, PatientController.detailPatient);
router.put("/patient/:id", verifyToken, PatientController.updatePatient);
router.delete("/patient/:id", verifyToken, PatientController.deletePatient);

//Rekam Medis
router.post("/rekam-medis", verifyToken, RekamMedisController.createRekamMedis);
router.get("/rekam-medis", verifyToken, RekamMedisController.getRM);
router.get("/rekam-medis/:id", verifyToken, RekamMedisController.getDetailRM);
router.put("/rekam-medis-koreksi/:id", verifyToken, RekamMedisController.updateKoreksi);
router.get(
  "/rekam-medis/patient/:id",
  verifyToken,
  RekamMedisController.getDetailbyPatient
);
router.delete(
  "/rekam-medis/:id",
  verifyToken,
  RekamMedisController.deleteRekamMedis
);

router.get("/list-kunjungan", verifyToken, RekamMedisController.listPatientDashbaord);
router.get("/wilayah", verifyToken, LayananController.getWilayah);

//Invoice
router.get("/invoice", verifyToken, TransactionController.getInvoice);
router.put("/invoice/:id", verifyToken, TransactionController.updateInvoice);

router.get("/dashboard", verifyToken, PatientController.dashboard);

router.post("/send-wa", verifyToken, upload.single('pdf'),WaController.sendWa);

module.exports = router;
