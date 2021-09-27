# OpenAI-JS

Unofficial Node.js wrapper for the [OpenAI API](https://beta.openai.com/)

## API Doc

See generated API doc: [openai-js](./docs/api/openai-js.md).

## Usage

```js
import { Client, ClientOptions } from "opanai-js";

// API Keys: https://beta.openai.com/docs/api-reference/authentication
const client = new Client({ apiKey: process.env.API_KEY });

// https://beta.openai.com/docs/api-reference/engines
const engines = await client.engines.list();

// https://beta.openai.com/docs/guides/completion
const completions = await client.completions.create("davinci", {
  prompt: "Once upon a time",
  max_tokens: 5,
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: false,
  logprobs: null,
  stop: "\n",
});

// https://beta.openai.com/docs/guides/search
const search = await client.search.create("davinci", {
  documents: ["White House", "hospital", "school"],
  query: "the president",
});

// https://beta.openai.com/docs/guides/classifications
const classification = await client.classifications.create({
  examples: [
    ["A happy moment", "Positive"],
    ["I am sad.", "Negative"],
    ["I am feeling awesome", "Positive"],
  ],
  labels: ["Positive", "Negative", "Neutral"],
  query: "It is a raining day :(",
  search_model: "ada",
  model: "curie",
});

// https://beta.openai.com/docs/guides/answers
const answer = await client.answers.create({
  documents: ["Puppy A is happy.", "Puppy B is sad."],
  question: "which puppy is happy?",
  search_model: "ada",
  model: "curie",
  examples_context: "In 2017, U.S. life expectancy was 78.6 years.",
  examples: [
    ["What is human life expectancy in the United States?", "78 years."],
  ],
  max_tokens: 5,
  stop: ["\n", "<|endoftext|>"],
});
```
