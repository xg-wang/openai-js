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
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  bestOf?: number;
  logit_bias?: Record<string, number>;
}

interface SearchParamsBase {
  query: string;
  max_rerank?: number;
  return_metadata?: boolean;
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

interface ClassificationParamsBase {
  model: string;
  query: string;
  examples?: [string, string][];
  file?: string;
  labels?: string[];
  search_model?: string;
  temperature?: number;
  logprobs?: number;
  max_examples?: number;
  logit_bias?: Record<string, number>;
  return_prompt?: boolean;
  return_metadata?: boolean;
  expand?: string[];
}
export interface ClassificationParamsWithExamples
  extends ClassificationParamsBase {
  examples: [string, string][];
  file?: never;
}
export interface ClassificationParamsWithFile extends ClassificationParamsBase {
  examples?: never;
  file: string;
}

// TODO: match label and text from params
export interface ClassificationSelectedExample {
  document: number;
  label: string;
  text: string;
}

// TODO: match label and text from params
export interface Classification {
  completion: string;
  label: string;
  model: string;
  object: "classification";
  search_model: string;
  selected_examples: ClassificationSelectedExample[];
}

interface AnswerParamsBase {
  model: string;
  question: string;
  examples: [string, string][];
  examples_context: string;
  search_model?: string;
  max_rerank?: number;
  temperature?: number;
  logprobs?: number;
  max_tokens?: number;
  stop?: string | string[];
  n?: number;
  logit_bias?: Record<string, number>;
  return_metadata?: boolean;
  return_prompt?: boolean;
  expand?: string[];
}
export interface AnswerParamsWithDocuments extends AnswerParamsBase {
  documents: string[];
  file?: never;
}
export interface AnswerParamsWithFile extends AnswerParamsBase {
  documents?: never;
  file: string;
}

export interface AnswerSelectedDocument {
  document: number;
  text: string;
}
export interface Answer {
  answers: string[];
  completion: string;
  model: string;
  object: "answer";
  search_model: string;
  selected_documents: AnswerSelectedDocument[];
}
