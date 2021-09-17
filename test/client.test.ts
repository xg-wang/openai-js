import { Client } from "../src/index";
import nock from "nock";
import { config } from "dotenv";

// Load API_KEY from .env
config();

nock("https://api.openai.com/v1")
  .get("/engines")
  .reply(200, {
    data: [
      {
        id: "engine-id-0",
        object: "engine",
        owner: "organization-owner",
        ready: true,
      },
      {
        id: "engine-id-2",
        object: "engine",
        owner: "organization-owner",
        ready: true,
      },
      {
        id: "engine-id-3",
        object: "engine",
        owner: "openai",
        ready: false,
      },
    ],
    object: "list",
  })
  .get("/engines/davinci")
  .reply(200, {
    id: "davinci",
    object: "engine",
    owner: "openai",
    ready: true,
  })
  .post("/engines/davinci/completions")
  .reply(200, {
    id: "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
    object: "text_completion",
    created: 1589478378,
    model: "davinci:2020-05-03",
    choices: [
      {
        text: " there was a girl who",
        index: 0,
        logprobs: null,
        finish_reason: "length",
      },
    ],
  });

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
});
