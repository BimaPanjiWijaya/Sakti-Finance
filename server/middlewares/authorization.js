const { Transaction } = require("../models");

const authorization = async function (req, res, next) {
  try {
    const { id } = req.params;

    const data = await Transaction.findByPk(id);

    if (!data) {
      throw { name: "NotFound", message: "Transaction not found" };
    }

    if (data.user_id !== req.user.id) {
      throw {
        name: "Forbidden",
        message: "You are not the owner of this transaction",
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
