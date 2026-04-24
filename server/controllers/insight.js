const { gemAi } = require("../helpers/gemai");
const { User, Transaction, Insight } = require("../models");

class InsightController {
  static async getInsight(req, res, next) {
    try {
      const userId = req.user.id;
      // Get period: Default to current month or customized
      const start_date =
        (req.body && req.body.start_date) ||
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1,
        ).toISOString();
      const end_date =
        (req.body && req.body.end_date) || new Date().toISOString();

      const user = await User.findByPk(userId);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      const transactions = await Transaction.findAll({
        where: {
          user_id: userId,
          date: {
            [require("sequelize").Op.between]: [
              new Date(start_date),
              new Date(end_date),
            ],
          },
        },
      });

      const totalSpending = transactions.reduce((sum, tx) => {
        return tx.type === "expense" ? sum + tx.amount : sum;
      }, 0);

      const totalIncome = transactions.reduce((sum, tx) => {
        return tx.type === "income" ? sum + tx.amount : sum;
      }, 0);

      const prompt = `Analyze this financial data and provide professional, actionable insights in Indonesian:
      - User Name: ${user.name}
      - User Salary: Rp${user.salary}
      - Location: ${user.location}
      - Total Monthly Income (including salary): Rp${totalIncome + user.salary}
      - Total Spending this Period: Rp${totalSpending}
      - Period: ${new Date(start_date).toLocaleDateString()} to ${new Date(end_date).toLocaleDateString()}
      - Number of transactions: ${transactions.length}
      
      Please provide:
      1. A professional summary (summary)
      2. A health status: Excellent, Good, Fair, or Poor (status)
      3. A spending score (0-100) (score)
      4. A specific recommendation (recommendation)
      
      Format your response as a valid JSON object ONLY, with these keys: "summary", "status", "score", "recommendation". Do not include any markdown formatting or extra text. make it "summary" under length 250 characters.`;

      const geminiResponse = await gemAi(prompt);

      let cleanJson = geminiResponse.replace(/```json|```/gi, "").trim();

      const jsonStart = cleanJson.indexOf("{");
      const jsonEnd = cleanJson.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanJson = cleanJson.substring(jsonStart, jsonEnd + 1);
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error("JSON Parse Error. Cleaned string was:", cleanJson);
        throw {
          name: "BadRequest",
          message: "Format response AI tidak valid. Silakan coba lagi.",
        };
      }

      const insight = await Insight.create({
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        summary: parsedResponse.summary,
        status: parsedResponse.status,
        spending_score: parsedResponse.score,
        recommendation: parsedResponse.recommendation,
        user_id: userId,
      });

      res.status(201).json({
        message: "Insight generated successfully",
        data: insight,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllInsights(req, res, next) {
    try {
      const userId = req.user.id;

      const insights = await Insight.findAll({
        where: {
          user_id: userId,
        },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        message: "Insights retrieved successfully",
        data: insights,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InsightController;
