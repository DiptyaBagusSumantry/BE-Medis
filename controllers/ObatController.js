const Models = require("../models/index.js");
const Obat = Models.Obat;
const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleGetPaginator,
} = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");

class ObatController {
  static async createObat(req, res) {
    try {
      const { code, name, price } = req.body;
      await Obat.create({
        code,
        name,
        price,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getObat(req, res) {
    try {
      const { page, search, sorting } = req.query;
      let whereClause = {};
      //sorting

      if (sorting) {
        whereClause.order = [["name", sorting ? sorting : "ASC"]];
      }

      //searching
      if (search) {
        whereClause.where = searchWhere(search, "name", "code");
      }

      const results = await Obat.findAll(whereClause);
      handleGetPaginator(res, paginator(results, page ? page : 1, 20));
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailObat(req, res) {
    try {
      const get = await Obat.findOne({
        where: {
          id: req.params.id,
        },
      });
      handleGet(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updatetObat(req, res) {
    try {
      const { code, name, price } = req.body;
      const update = await Obat.update(
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
  static async deleteObat(req, res) {
    try {
      const get = await Obat.destroy({
        where: { id: req.params.id },
      });
      handleDelete(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = ObatController;
