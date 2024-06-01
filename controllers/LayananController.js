const Models = require("../models/index.js");
const Layanan = Models.Layanan;
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

class LayananController {
  static async createLayanan(req, res) {
    try {
      const { code, name, price } = req.body;
      await Layanan.create({
        code,
        name,
        price,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getLayanan(req, res) {
    try {
      const { page, search, sorting } = req.query;
      let whereClause = {};
      //sorting

      if(sorting){
        whereClause.order = [["name", sorting ? sorting : "ASC"]];
      }

      //searching
      if (search) {
        whereClause.where = searchWhere(search, "name", "code");
      }

      const results = await Layanan.findAll(whereClause);
      handleGetPaginator(res, paginator(results, page ? page : 1, 20));
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailLayanan(req, res) {
    try {
      const get = await Layanan.findOne({
        where: {
          id: req.params.id,
        },
      });
      handleGet(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updatetLayanan(req, res) {
    try {
      const { code, name, price } = req.body;
      const update = await Layanan.update(
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
  static async deleteLayanan(req, res) {
    try {
      const get = await Layanan.destroy({
        where: { id: req.params.id },
      });
      handleDelete(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = LayananController;
