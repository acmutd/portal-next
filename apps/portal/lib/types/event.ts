export interface EventResult {
  summary: string;
  start: string;
  location: string;
}

export interface ActiveEventResult extends EventResult {
  end: string;
  id: string;
  description: string;
  url: string;
  isPublic: boolean;
}
