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
        maxTokens: 5,
        temperature: 1,
        topP: 1,
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
});
