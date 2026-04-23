const express = require("express");
const transactionRouter = express.Router();
const TransactionController = require("../controllers/transaction");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

transactionRouter.post(
  "/transactions",
  authentication,
  TransactionController.createTansaction,
);
transactionRouter.get(
  "/transactions",
  authentication,
  TransactionController.getAllData,
);
transactionRouter.get(
  "/transactions/:id",
  authentication,
  TransactionController.getDataById,
);
transactionRouter.put(
  "/transactions/:id",
  authentication,
  authorization,
  TransactionController.updateData,
);
transactionRouter.delete(
  "/transactions/:id",
  authentication,
  authorization,
  TransactionController.deleteData,
);

module.exports = transactionRouter;
