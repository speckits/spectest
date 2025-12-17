import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.claude/commands/spectest/proposal.md',
  apply: '.claude/commands/spectest/apply.md',
  archive: '.claude/commands/spectest/archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
name: SpecTest: Proposal
description: Scaffold a new SpecTest change and validate strictly.
category: SpecTest
tags: [spectest, change]
---`,
  apply: `---
name: SpecTest: Apply
description: Implement an approved SpecTest change and keep tasks in sync.
category: SpecTest
tags: [spectest, apply]
---`,
  archive: `---
name: SpecTest: Archive
description: Archive a deployed SpecTest change and update specs.
category: SpecTest
tags: [spectest, archive]
---`
};

export class ClaudeSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'claude';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}
