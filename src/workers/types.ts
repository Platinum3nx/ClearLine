export interface WorkerDefinition {
  name: string;
  handler: () => Promise<void>;
}
