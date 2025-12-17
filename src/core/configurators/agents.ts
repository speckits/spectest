import path from 'path';
import { ToolConfigurator } from './base.js';
import { FileSystemUtils } from '../../utils/file-system.js';
import { TemplateManager } from '../templates/index.js';
import { SPECTEST_MARKERS } from '../config.js';

export class AgentsStandardConfigurator implements ToolConfigurator {
  name = 'AGENTS.md standard';
  configFileName = 'AGENTS.md';
  isAvailable = true;

  async configure(projectPath: string, _spectestDir: string): Promise<void> {
    const filePath = path.join(projectPath, this.configFileName);
    const content = TemplateManager.getAgentsStandardTemplate();

    await FileSystemUtils.updateFileWithMarkers(
      filePath,
      content,
      SPECTEST_MARKERS.start,
      SPECTEST_MARKERS.end
    );
  }
}
