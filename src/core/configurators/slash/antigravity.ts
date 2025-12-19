import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

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
}
