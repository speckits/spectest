import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const NEW_FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.roo/commands/spectest-proposal.md',
  apply: '.roo/commands/spectest-apply.md',
  archive: '.roo/commands/spectest-archive.md'
};

export class RooCodeSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'roocode';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return NEW_FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    const descriptions: Record<SlashCommandId, string> = {
      proposal: 'Scaffold a new test change and validate strictly.',
      apply: 'Implement an approved test change and keep tasks in sync.',
      archive: 'Archive a deployed test change and update test specs.'
    };
    const description = descriptions[id];
    return `# SpecTest: ${id.charAt(0).toUpperCase() + id.slice(1)}\n\n${description}`;
  }
}
