import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

/**
 * File paths for Qoder slash commands
 * Maps each SpecTest workflow stage to its command file location
 * Commands are stored in .qoder/commands/spectest/ directory
 */
const FILE_PATHS: Record<SlashCommandId, string> = {
  // Create and validate new test change proposals
  proposal: '.qoder/commands/spectest/proposal.md',
  
  // Implement approved test changes with task tracking
  apply: '.qoder/commands/spectest/apply.md',
  
  // Archive completed test changes and update test specs
  archive: '.qoder/commands/spectest/archive.md'
};

/**
 * YAML frontmatter for Qoder slash commands
 * Defines metadata displayed in Qoder's command palette
 * Each command is categorized and tagged for easy discovery
 */
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

/**
 * Qoder Slash Command Configurator
 * 
 * Manages SpecTest slash commands for Qoder AI assistant.
 * Creates three workflow commands: proposal, apply, and archive.
 * Uses colon-separated command format (/spectest:proposal).
 * 
 * @extends {SlashCommandConfigurator}
 */
export class QoderSlashCommandConfigurator extends SlashCommandConfigurator {
  /** Unique identifier for Qoder tool */
  readonly toolId = 'qoder';
  
  /** Indicates slash commands are available for this tool */
  readonly isAvailable = true;

  /**
   * Get relative file path for a slash command
   * 
   * @param {SlashCommandId} id - Command identifier (proposal, apply, or archive)
   * @returns {string} Relative path from project root to command file
   */
  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  /**
   * Get YAML frontmatter for a slash command
   * 
   * Frontmatter defines how the command appears in Qoder's UI,
   * including display name, description, and categorization.
   * 
   * @param {SlashCommandId} id - Command identifier (proposal, apply, or archive)
   * @returns {string} YAML frontmatter block with command metadata
   */
  protected getFrontmatter(id: SlashCommandId): string {
    return FRONTMATTER[id];
  }
}