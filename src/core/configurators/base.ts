export interface ToolConfigurator {
  name: string;
  configFileName: string;
  isAvailable: boolean;
  configure(projectPath: string, spectestDir: string): Promise<void>;
}