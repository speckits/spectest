import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';
import { TemplateManager } from '../../templates/index.js';
import { FileSystemUtils } from '../../../utils/file-system.js';
import { SPECTEST_MARKERS } from '../../config.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.agent/workflows/spectest-proposal.md',
  apply: '.agent/workflows/spectest-apply.md',
  archive: '.agent/workflows/spectest-archive.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
  proposal: 'Scaffold a new SpecTest test change and validate strictly.',
  apply: 'Implement an approved SpecTest test change and keep tasks in sync.',
  archive: 'Archive a deployed SpecTest test change and update test specs.'
};

export class AntigravitySlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'antigravity';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    const description = DESCRIPTIONS[id];
    return `---\ndescription: ${description}\n---`;
  }

  async updateExisting(projectPath: string, _spectestDir: string): Promise<string[]> {
    const updated: string[] = [];
    for (const target of this.getTargets()) {
      const filePath = FileSystemUtils.joinPath(projectPath, target.path);
      if (await FileSystemUtils.fileExists(filePath)) {
        const body = TemplateManager.getSlashCommandBody(target.id).trim();
        await this.updateFullFile(filePath, target.id, body);
        updated.push(target.path);
      }
    }
    return updated;
  }

  private async updateFullFile(filePath: string, id: SlashCommandId, body: string): Promise<void> {
    const content = await FileSystemUtils.readFile(filePath);
    const startIndex = content.indexOf(SPECTEST_MARKERS.start);

    if (startIndex === -1) {
      throw new Error(`Missing SpecTest start marker in ${filePath}`);
    }

    // Replace everything before the start marker with the new frontmatter
    const frontmatter = this.getFrontmatter(id);
    const sections: string[] = [];
    if (frontmatter) sections.push(frontmatter.trim());
    sections.push(`${SPECTEST_MARKERS.start}\n${body}\n${SPECTEST_MARKERS.end}`);

    await FileSystemUtils.writeFile(filePath, sections.join('\n') + '\n');
  }
}
