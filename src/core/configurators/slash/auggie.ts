import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.augment/commands/spectest-proposal.md',
  apply: '.augment/commands/spectest-apply.md',
  archive: '.augment/commands/spectest-archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
description: Scaffold a new test change and validate strictly.
argument-hint: test change request or description
---`,
  apply: `---
description: Implement an approved test change and keep tasks in sync.
argument-hint: change-id
---`,
  archive: `---
description: Archive a deployed test change and update test specs.
argument-hint: change-id
---`
};

export class AuggieSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'auggie';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}

