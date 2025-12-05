export interface SessionMessage {
  id: string;
  content: string;
  role: "model" | "user";
}
