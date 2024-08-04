const Models = require("../models/index.js");

const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleGetPaginator,
} = require("../helper/HandlerError.js");

class WaController {
  static async sendWa(req, res) {
   try {
    console.log(req.query)
    const text = "Terima Kasih Telah Berkunjung. Semoga Lekas Sembuh";
    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get("host")}/assets/${
        req.file.filename
      }`;
      res.json({
        fileUrl: `https://wa.me/${req.query.phone}?text=${fileUrl}`,
      });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
   } catch (error) {
    handlerError(res, error)
   }
  }
}

module.exports = WaController;
