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
