const express = require("express");
const axios = require("axios");
const OpenAI = require("openai");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post("/analyze-comment", async (req, res) => {
  const { comment } = req.body;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-0613",
      prompt: `Analyze the following comment to determine its objectivity, toxicity, inappropriateness, and spam. Keep in mind that constructive criticism is allowed, severe insults are totally forbidden. Then assign reward points on a scale of 0 to 100 based on the overall quality of the comment.

      The responses should be formatted as follows:
      
      {
        "analysis": {
          "comment": "string", // The comment submitted for analysis. (String)
          "allowed":"boolean", // True if the comment passed the filter, false if it should be deleted
          "objectivity": "string", // The evaluation of the comment's objectivity, this alone does not affect the allowed status but does impact on the rewards. (Number between 0 and 10, 0 being the most subjective and 10 being the most objective)
          "toxicity": "number (0-10)", // The toxicity score of the comment. (Number between 0 and 10, 0 being the least toxic and 10 being the most toxic)
          "spam": "number (0-10)", // The spam score of the comment. (Number between 0 and 10, 0 being the least spammy and 10 being the most spammy)
          "inappropriate": "number (0-10)", // The inappropriate score of the comment, this alone does not affect the allowed status . (Number between 0 and 10, 0 being the least inappropriate and 10 being the most inappropriate)
          "severeToxicity": "boolean" // If toxicity is above 7, set to true and ban the comment or if toxicity is above 5 and innapropriate is above 5, can be used to sanction the user (boolean)
        },
        "reward": {
          "trust-index": "number (0-100)", // The number of reward points assigned to the comment, any constructive criticism should not lower the trust index. (Number between 0 and 100, if the comment is inappropriate or toxic then we give 0 points)
          "points": "number (0-100)" // The number of reward points assigned to the comment, can be used to reward the user with currency, experience, etc... . (Number between 0 and 100, if the comment is inappropriate or toxic then we give 0 points)
        }
      }, Here is the comment : ${comment}`,
    });

    res.json({ response: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error analyzing comment");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
