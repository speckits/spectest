import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.crush/commands/spectest/proposal.md',
  apply: '.crush/commands/spectest/apply.md',
  archive: '.crush/commands/spectest/archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
name: SpecTest: Proposal
description: Scaffold a new SpecTest test change and validate strictly.
category: SpecTest
tags: [spectest, test-change]
---`,
  apply: `---
name: SpecTest: Apply
description: Implement an approved SpecTest test change and keep tasks in sync.
category: SpecTest
tags: [spectest, apply]
---`,
  archive: `---
name: SpecTest: Archive
description: Archive a deployed SpecTest test change and update test specs.
category: SpecTest
tags: [spectest, archive]
---`
};

export class CrushSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'crush';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}