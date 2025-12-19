import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.iflow/commands/spectest-proposal.md',
  apply: '.iflow/commands/spectest-apply.md',
  archive: '.iflow/commands/spectest-archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
name: /spectest-proposal
id: spectest-proposal
category: SpecTest
description: Scaffold a new SpecTest test change and validate strictly.
---`,
  apply: `---
name: /spectest-apply
id: spectest-apply
category: SpecTest
description: Implement an approved SpecTest test change and keep tasks in sync.
---`,
  archive: `---
name: /spectest-archive
id: spectest-archive
category: SpecTest
description: Archive a deployed SpecTest test change and update test specs.
---`
};

export class IflowSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'iflow';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}
