if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const insightRouter = require("./routes/insight");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(authentication);
app.use(transactionRouter);
app.use(insightRouter);

app.use(errorHandler);

module.exports = app;
