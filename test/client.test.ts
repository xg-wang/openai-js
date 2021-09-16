import { Client } from "../src/index";
import { config } from "dotenv";

// Load API_KEY from .env
config();

describe("Client", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({ apiKey: process.env.API_KEY });
  });

  describe("Engines", () => {
    it("should list engines", async () => {
      const engines = await client.engines.list();
      console.log(engines);
      expect(engines).toEqual(
        expect.objectContaining({
          object: "list",
          data: expect.arrayContaining([]),
        })
      );
    });
  });
});
