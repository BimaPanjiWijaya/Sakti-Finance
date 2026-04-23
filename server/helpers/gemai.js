const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function gemAi(prompt) {
  try {
    console.log("API KEY:", process.env.GEMINI_API_KEY);
    console.log("Calling Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    console.log("FULL RESPONSE:", JSON.stringify(response, null, 2));

    const text = response.candidates[0].content.parts[0].text;
    return text;
  } catch (err) {
    console.log("GEMINI ERROR:", err);
    throw err;
  }
}

module.exports = { gemAi };
