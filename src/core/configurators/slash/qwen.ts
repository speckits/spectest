/**
 * Qwen slash command configurator for SpecTest integration.
 * This class handles the generation of Qwen-specific slash command files
 * in the .qwen/commands directory structure.
 * 
 * @implements {SlashCommandConfigurator}
 */
import { TomlSlashCommandConfigurator } from './toml-base.js';
import { SlashCommandId } from '../../templates/index.js';

/** 
 * Mapping of slash command IDs to their corresponding file paths in .qwen/commands directory.
 * @type {Record<SlashCommandId, string>}
 */
const FILE_PATHS: Record<SlashCommandId, string> = {
  proposal: '.qwen/commands/spectest-proposal.toml',
  apply: '.qwen/commands/spectest-apply.toml',
  archive: '.qwen/commands/spectest-archive.toml'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
  proposal: 'Scaffold a new SpecTest test change and validate strictly.',
  apply: 'Implement an approved SpecTest test change and keep tasks in sync.',
  archive: 'Archive a deployed SpecTest test change and update test specs.'
};

/**
 * QwenSlashCommandConfigurator class provides integration with Qwen Code
 * by creating the necessary slash command files in the .qwen/commands directory.
 * 
 * The slash commands include:
 * - /spectest-proposal: Create a SpecTest test change proposal
 * - /spectest-apply: Apply an approved SpecTest test change
 * - /spectest-archive: Archive a deployed SpecTest test change
 */
export class QwenSlashCommandConfigurator extends TomlSlashCommandConfigurator {
  /** Unique identifier for the Qwen tool */
  readonly toolId = 'qwen';

  /** Availability status for the Qwen tool */
  readonly isAvailable = true;

  /**
   * Returns the relative file path for a given slash command ID.
   * @param {SlashCommandId} id - The slash command identifier
   * @returns {string} The relative path to the command file
   */
  protected getRelativePath(id: SlashCommandId): string {
    return FILE_PATHS[id];
  }

  protected getDescription(id: SlashCommandId): string {
    return DESCRIPTIONS[id];
  }
}