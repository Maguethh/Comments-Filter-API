# Comment Analysis API

This is an API that uses OpenAI's GPT-3 model to analyze comments for objectivity, toxicity, inappropriateness, and spam. It also assigns reward points based on the overall quality of the comment.

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory and add your OpenAI API key like so:

```
OPENAI_API_KEY=your_api_key_here
```

4. Run `npm start` to start the server

## Usage

Make a POST request to the `/analyze-comment` endpoint with a JSON body containing the comment you want to analyze. For example:

```json
{
  "comment": "Your comment here"
}
```

The response will be a JSON object containing the analysis and reward points. For example:

```json
{
  "analysis": {
    "comment": "Your comment here",
    "allowed": true,
    "objectivity": "High",
    "toxicity": 2,
    "spam": 0,
    "inappropriate": 1,
    "severeToxicity": false // If toxicity is above 7, can be used to sanction or ban the user
  },
  "reward": {
    "trust-index": 90,
    "points": 10
  }
}
```

## Reward System

The reward system can be used to incentivize positive behavior in your application. For example, you could convert the reward points into a currency that can be used in your application:

```javascript
const rewardPoints = response.reward.points;
const currency = rewardPoints \* 0.01; // Convert points to currency at a rate of 1 point = 0.01 currency
```

You could also use the trust index to determine the user's reputation in your application:

```javascript
const trustIndex = response.reward["trust-index"];
if (trustIndex < 50) {
  // User has a low reputation, consider limiting their privileges
} else {
  // User has a high reputation, consider granting them additional privileges
}
```

Remember, constructive criticism should not lower the trust index, and any comment that is inappropriate or toxic will receive 0 points.

```

```
