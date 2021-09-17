export type Endpoint = "engines";

export interface Engine {
  id: string;
  object: "engine";
  owner: string;
  ready: boolean;
}

export interface EngineList {
  object: "list";
  data: Engine[];
}

export interface Choice {
  text: string;
  index: number;
  logprobs: unknown;
  finish_reason: string;
}

export interface Completion {
  id: string;
  object: "text_completion";
  created: number;
  model: string;
  choices: Choice[];
}

export interface CompletionParams {
  prompt?: string | string[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string | string[];
  presencePenalty?: number;
  frequencyPenalty?: number;
  bestOf?: number;
  logitBias?: Record<string, number>;
}

interface SearchParamsBase {
  query: string;
  maxRerank?: number;
  returnMetadata?: boolean;
}
export interface SearchParamsWithDocuments extends SearchParamsBase {
  documents: string[];
  file?: never;
}
export interface SearchParamsWithFile extends SearchParamsBase {
  documents?: never;
  file: string;
}

export interface SearchData {
  document: number;
  object: "search_result";
  score: number;
}
export interface Search {
  data: SearchData[];
  object: "list";
}
