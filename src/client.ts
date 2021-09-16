import fetch from "node-fetch";
import type { Endpoint, Engine, EngineList } from "./types";

interface ClientOptions {
  /**
   * API key in an Authorization HTTP header
   * https://beta.openai.com/docs/api-reference/authentication
   */
  apiKey?: string;
  /**
   * Count against the specified organization's subscription quota.
   * https://beta.openai.com/docs/api-reference/requesting-organization
   */
  organization?: string;
}

export class Client {
  #apiKey: string | undefined;
  #organization: string | undefined;
  #baseURL: string;

  constructor(options?: ClientOptions) {
    this.#apiKey = options?.apiKey;
    this.#organization = options?.organization;
    this.#baseURL = "https://api.openai.com/v1/";
  }

  /**
   * https://beta.openai.com/docs/api-reference/engines
   */
  public readonly engines = {
    list: (): Promise<EngineList> => {
      return this.fetch<EngineList>("engines", { method: "GET" });
    },
    retrieve: (engineId: string): Promise<Engine> => {
      return this.fetch<Engine>(`engines/${engineId}`, { method: "GET" });
    },
  };

  private fetch<T extends unknown>(
    endpoint: Endpoint | string,
    requestData: { method: "GET" } | { method: "POST"; body: string }
  ): Promise<T> {
    const init = Object.assign(
      {
        headers: {
          Authorization: `Bearer ${this.#apiKey}`,
        },
      },
      requestData
    );
    return fetch(`${this.#baseURL}${endpoint}`, init).then(
      (res) => res.json() as T
    );
  }
}
