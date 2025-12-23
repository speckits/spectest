import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.amazonq/prompts/spectest-proposal.md',
  apply: '.amazonq/prompts/spectest-apply.md',
  archive: '.amazonq/prompts/spectest-archive.md'
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
description: Scaffold a new test change and validate strictly.
---

The user has requested the following test change proposal. Use the spectest instructions to create their test change proposal.

<UserRequest>
  $ARGUMENTS
</UserRequest>`,
  apply: `---
description: Implement an approved test change and keep tasks in sync.
---

The user wants to apply the following test change. Use the spectest instructions to implement the approved test change.

<ChangeId>
  $ARGUMENTS
</ChangeId>`,
  archive: `---
description: Archive a deployed test change and update test specs.
---

The user wants to archive the following deployed test change. Use the spectest instructions to archive the test change and update test specs.

<ChangeId>
  $ARGUMENTS
</ChangeId>`
};

export class AmazonQSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = 'amazon-q';
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}