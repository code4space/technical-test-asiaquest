const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class AI {
  static async askAI(req, res, next) {
    try {
      const prompt = req.body.prompt;
      if (prompt === null) throw new Error("Prompt Required!");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 64,
      });
      const completion = response.data.choices[0].text;

      return res.status(200).json({
        success: true,
        message: completion,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = AI;
