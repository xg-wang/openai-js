import fetch, { Headers } from "node-fetch";
import type { RequestInit } from "node-fetch";
import type {
  Classification,
  ClassificationParamsWithExamples,
  ClassificationParamsWithFile,
  Completion,
  CompletionParams,
  Endpoint,
  Engine,
  EngineList,
  FileList,
  SearchList,
  SearchParamsWithDocuments,
  SearchParamsWithFile,
} from "./types";
import { Answer, AnswerParamsWithDocuments, AnswerParamsWithFile } from ".";

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

  /**
   * https://beta.openai.com/docs/api-reference/completions
   * TODO: support create completions via GET
   */
  public readonly completions = {
    create: (
      engineId: string,
      requestBody: CompletionParams
    ): Promise<Completion> => {
      return this.fetch<Completion>(`engines/${engineId}/completions`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    },
  };

  /**
   * https://beta.openai.com/docs/api-reference/searches
   */
  public readonly search = {
    create: (
      engineId: string,
      requestBody: SearchParamsWithDocuments | SearchParamsWithFile
    ): Promise<SearchList> => {
      return this.fetch<SearchList>(`engines/${engineId}/search`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    },
  };

  /**
   * @beta
   * https://beta.openai.com/docs/api-reference/classifications
   */
  public readonly classifications = {
    create: (
      requestBody:
        | ClassificationParamsWithExamples
        | ClassificationParamsWithFile
    ): Promise<Classification> => {
      return this.fetch<Classification>("classifications", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    },
  };

  /**
   * @beta
   * https://beta.openai.com/docs/api-reference/answers
   */
  public readonly answers = {
    create: (
      requestBody: AnswerParamsWithDocuments | AnswerParamsWithFile
    ): Promise<Answer> => {
      return this.fetch<Answer>("answers", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    },
  };

  /**
   * TODO: upload, retrieve, delete
   * https://beta.openai.com/docs/api-reference/files
   */
  public readonly files = {
    list: (): Promise<FileList> => {
      return this.fetch<FileList>("files", {
        method: "GET",
      });
    },
  };

  /**
   * @beta
   * TODO
   * https://beta.openai.com/docs/guides/fine-tuning
   */
  public readonly fineTune = {};

  private async fetch<T extends unknown>(
    endpoint: Endpoint | string,
    requestData: { method: "GET" } | { method: "POST"; body: string }
  ): Promise<T> {
    const headers = new Headers({
      Authorization: `Bearer ${this.#apiKey}`,
      "Content-Type": "application/json",
    });
    if (this.#organization) {
      headers.set("OpenAI-Organization", this.#organization);
    }
    const init: RequestInit = Object.assign(
      {
        headers,
      },
      requestData
    );
    const res = await fetch(`${this.#baseURL}${endpoint}`, init);
    return res.json() as T;
  }
}
