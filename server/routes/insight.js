const express = require("express");
const insightRouter = express.Router();
const InsightController = require("../controllers/insight");
const authentication = require("../middlewares/authentication");

insightRouter.post("/insights", authentication, InsightController.getInsight);
insightRouter.get(
  "/insights",
  authentication,
  InsightController.getAllInsights,
);

module.exports = insightRouter;
