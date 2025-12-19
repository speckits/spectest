import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS = {
  proposal: '.cospec/spectest/commands/spectest-proposal.md',
  apply: '.cospec/spectest/commands/spectest-apply.md',
  archive: '.cospec/spectest/commands/spectest-archive.md',
} as const satisfies Record<SlashCommandId, string>;

const FRONTMATTER = {
  proposal: `---
description: "Scaffold a new SpecTest test change and validate strictly."
argument-hint: feature description or request
---`,
  apply: `---
description: "Implement an approved SpecTest test change and keep tasks in sync."
argument-hint: change-id
---`,
  archive: `---
description: "Archive a deployed SpecTest test change and update test specs."
argument-hint: change-id
---`
} as const satisfies Record<SlashCommandId, string>;

export class CostrictSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'costrict';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    return FRONTMATTER[id];
  }
}