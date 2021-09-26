import { Client } from "../src/index";
import { mocks } from "./mocks";
import { config } from "dotenv";

// Load API_KEY from .env
config();
mocks();

describe("Client", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({ apiKey: process.env.API_KEY });
  });

  describe("Engines", () => {
    it("should list engines", async () => {
      const engines = await client.engines.list();
      expect(engines).toEqual(
        expect.objectContaining({
          object: "list",
          data: expect.arrayContaining([]),
        })
      );
    });
  });

  describe("Completions", () => {
    it("should create completion", async () => {
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
      expect(completions).toEqual({
        id: expect.any(String),
        object: "text_completion",
        created: expect.any(Number),
        model: expect.any(String),
        choices: expect.arrayContaining([]),
      });
    });
  });

  describe("Search", () => {
    it("should create search data list", async () => {
      const search = await client.search.create("davinci", {
        documents: ["White House", "hospital", "school"],
        query: "the president",
      });
      expect(search).toEqual({
        object: "list",
        data: expect.arrayContaining([]),
      });
    });
  });

  describe("Classification", () => {
    it("should create classification", async () => {
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
      expect(classification).toEqual({
        completion: expect.any(String),
        label: expect.any(String),
        model: expect.any(String),
        object: "classification",
        search_model: "ada",
        selected_examples: expect.arrayContaining([]),
      });
    });
  });

  describe("Answers", () => {
    it("should create answer", async () => {
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
      expect(answer).toEqual({
        object: "answer",
        answers: expect.arrayContaining([]),
        completion: expect.any(String),
        model: expect.any(String),
        search_model: "ada",
        selected_documents: expect.arrayContaining([]),
      });
    });
  });
});
