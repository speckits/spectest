import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.windsurf/workflows/spectest-proposal.md',
  apply: '.windsurf/workflows/spectest-apply.md',
  archive: '.windsurf/workflows/spectest-archive.md'
};

export class WindsurfSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'windsurf';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    const descriptions: Record<SlashCommandId, string> = {
      proposal: 'Scaffold a new SpecTest change and validate strictly.',
      apply: 'Implement an approved SpecTest change and keep tasks in sync.',
      archive: 'Archive a deployed SpecTest change and update specs.'
    };
    const description = descriptions[id];
    return `---\ndescription: ${description}\nauto_execution_mode: 3\n---`;
  }
}
