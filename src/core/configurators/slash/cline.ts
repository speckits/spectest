import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.clinerules/workflows/spectest-proposal.md',
  apply: '.clinerules/workflows/spectest-apply.md',
  archive: '.clinerules/workflows/spectest-archive.md'
};

export class ClineSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'cline';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    const descriptions: Record<SlashCommandId, string> = {
      proposal: 'Scaffold a new SpecTest test change and validate strictly.',
      apply: 'Implement an approved SpecTest test change and keep tasks in sync.',
      archive: 'Archive a deployed SpecTest test change and update test specs.'
    };
    const description = descriptions[id];
    return `# SpecTest: ${id.charAt(0).toUpperCase() + id.slice(1)}\n\n${description}`;
  }
}
