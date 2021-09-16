export type Endpoint = 'engines';

export interface Engine {
  id: string;
  object: "engine",
  owner: string;
  ready: boolean
}

export interface EngineList {
  object: "list";
  data: Engine[]
}
