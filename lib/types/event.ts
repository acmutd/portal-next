export interface EventResult {
  id: string;
  summary: string;
  description: string;
  start: string;
  end: string;
  location: string;
  url?: string;
  isPublic?: boolean;
}

export interface ActiveEventResult extends EventResult {
  id: string;
  description: string;
  url: string;
  isPublic: boolean;
  category?:
    | {
        id: string;
      }
    | null
    | undefined;
}
