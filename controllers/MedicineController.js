const Models = require("../models/index.js");
const Medicine = Models.Medicine;
const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
} = require("../helper/HandlerError.js");

class MedicineController {
  static async createMedicine(req, res) {
    try {
      const { code, name, price } = req.body;
      await Medicine.create({
        code,
        name,
        price,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getMedicine(req, res) {
    try {
      const get = await Medicine.findAll();
      handleGet(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updatetMedicine(req, res) {
    try {
      const { code, name, price } = req.body;
      const update = await Medicine.update(
        {
          code,
          name,
          price,
        },
        {
          where: { id: req.params.id },
        }
      );
      handleUpdate(res, update);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deleteMedicine(req, res) {
    try {
      const get = await Medicine.destroy({
        where: {id: req.params.id}
      });
      handleDelete(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MedicineController;