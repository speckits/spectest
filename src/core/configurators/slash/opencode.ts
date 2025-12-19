import { SlashCommandConfigurator } from "./base.js";
import { SlashCommandId } from "../../templates/index.js";
import { FileSystemUtils } from "../../../utils/file-system.js";
import { SPECTEST_MARKERS } from "../../config.js";

const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: ".opencode/command/spectest-proposal.md",
  apply: ".opencode/command/spectest-apply.md",
  archive: ".opencode/command/spectest-archive.md",
};

const FRONTMATTER: Record<SlashCommandId, string> = {
  proposal: `---
description: Scaffold a new SpecTest test change and validate strictly.
---
The user has requested the following test change proposal. Use the spectest instructions to create their test change proposal.
<UserRequest>
  $ARGUMENTS
</UserRequest>
`,
  apply: `---
description: Implement an approved SpecTest test change and keep tasks in sync.
---
The user has requested to implement the following test change proposal. Find the test change proposal and follow the instructions below. If you're not sure or if ambiguous, ask for clarification from the user.
<UserRequest>
  $ARGUMENTS
</UserRequest>
`,
  archive: `---
description: Archive a deployed SpecTest test change and update test specs.
---
<ChangeId>
  $ARGUMENTS
</ChangeId>
`,
};

export class OpenCodeSlashCommandConfigurator extends SlashCommandConfigurator {
  readonly toolId = "opencode";
  readonly isAvailable = true;

  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getFrontmatter(id: SlashCommandId): string | undefined {
    return FRONTMATTER[id];
  }

  async generateAll(projectPath: string, _spectestDir: string): Promise<string[]> {
    const createdOrUpdated = await super.generateAll(projectPath, _spectestDir);
    await this.rewriteArchiveFile(projectPath);
    return createdOrUpdated;
  }

  async updateExisting(projectPath: string, _spectestDir: string): Promise<string[]> {
    const updated = await super.updateExisting(projectPath, _spectestDir);
    const rewroteArchive = await this.rewriteArchiveFile(projectPath);
    if (rewroteArchive && !updated.includes(FILE_PATHS.archive)) {
      updated.push(FILE_PATHS.archive);
    }
    return updated;
  }

  private async rewriteArchiveFile(projectPath: string): Promise<boolean> {
    const archivePath = FileSystemUtils.joinPath(projectPath, FILE_PATHS.archive);
    if (!await FileSystemUtils.fileExists(archivePath)) {
      return false;
    }

    const body = this.getBody("archive");
    const frontmatter = this.getFrontmatter("archive");
    const sections: string[] = [];

    if (frontmatter) {
      sections.push(frontmatter.trim());
    }

    sections.push(`${SPECTEST_MARKERS.start}\n${body}\n${SPECTEST_MARKERS.end}`);
    await FileSystemUtils.writeFile(archivePath, sections.join("\n") + "\n");
    return true;
  }
}
