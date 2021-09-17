import nock from "nock";

export function mocks(): nock.Scope {
  return nock("https://api.openai.com/v1")
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
    })
    .post("/engines/davinci/search")
    .reply(200, {
      data: [
        {
          document: 0,
          object: "search_result",
          score: 215.412,
        },
        {
          document: 1,
          object: "search_result",
          score: 40.316,
        },
        {
          document: 2,
          object: "search_result",
          score: 55.226,
        },
      ],
      object: "list",
    });
}
