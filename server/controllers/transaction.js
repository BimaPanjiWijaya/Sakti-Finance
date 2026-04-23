const { Transaction } = require("../models");

class TransactionController {
  static async createTansaction(req, res, next) {
    try {
      const newBody = { ...req.body };

      newBody.user_id = req.user.id;
      const data = await Transaction.create(newBody);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getAllData(req, res, next) {
    try {
      const data = await Transaction.findAll({
        where: {
          user_id: req.user.id,
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getDataById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Transaction.findOne({
        where: {
          id,
          user_id: req.user.id,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updateData(req, res, next) {
    try {
      const { type, amount, description, date, is_recurring } = req.body;
      const data = await Transaction.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      await data.update({
        type,
        amount,
        description,
        date,
        is_recurring,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteData(req, res, next) {
    try {
      const data = await Transaction.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      await data.destroy();
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
