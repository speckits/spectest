import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.codebuddy/commands/spectest/proposal.md',
  apply: '.codebuddy/commands/spectest/apply.md',
  archive: '.codebuddy/commands/spectest/archive.md'
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

export class CodeBuddySlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'codebuddy';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}

