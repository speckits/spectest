export type SlashCommandId = 'proposal' | 'apply' | 'archive';

const baseGuardrails = `**Guardrails**
- Favor straightforward, minimal implementations first and add complexity only when it is requested or clearly required.
- Keep changes tightly scoped to the requested outcome.
- Refer to \`spectest/AGENTS.md\` (located inside the \`spectest/\` directory—run \`ls spectest\` or \`spectest update\` if you don't see it) if you need additional SpecTest conventions or clarifications.`;

const proposalGuardrails = `${baseGuardrails}\n- Identify any vague or ambiguous details and ask the necessary follow-up questions before editing files.
- Do not write any test code during the proposal stage. Only create design documents (proposal.md, tasks.md, design.md, and spec deltas). Test implementation happens in the apply stage after approval.`;

const proposalSteps = `**Steps**
1. Review \`spectest/project.md\`, run \`spectest list\` and \`spectest list --specs\`, and inspect related test files (e.g., via \`rg\`/\`ls\`) to understand current test coverage; note any gaps that require clarification.
2. Choose a unique verb-led \`change-id\` (e.g., \`add-login-tests\`, \`improve-checkout-coverage\`) and scaffold \`proposal.md\`, \`tasks.md\`, and \`design.md\` (when needed) under \`spectest/changes/<id>/\`.
3. Map the test change into concrete test capabilities or requirements, breaking multi-scope efforts into distinct spec deltas with clear relationships and sequencing.
4. Capture test strategy reasoning in \`design.md\` when the test solution spans multiple systems, introduces new test patterns, or demands trade-off discussion before committing to specs.
5. Draft spec deltas in \`changes/<id>/specs/<test-capability>/spec.md\` (one folder per test capability) using \`## ADDED|MODIFIED|REMOVED Requirements\` with at least one \`#### Scenario:\` per test requirement. Focus on test coverage requirements and test scenarios.
6. Draft \`tasks.md\` as an ordered list of test-related work items: test planning, test generation, test healing, and validation. Include test-specific tasks like "Create test plan", "Generate Playwright tests", "Fix failing tests".
7. Validate with \`spectest validate <id> --strict\` and resolve every issue before sharing the proposal.`;


const proposalReferences = `**Reference**
- Use \`spectest show <id> --json --deltas-only\` or \`spectest show <spec> --type spec\` to inspect details when validation fails.
- Search existing test requirements with \`rg -n "Requirement:|Scenario:" spectest/specs\` before writing new ones.
- Explore the test codebase and test files with \`rg <keyword>\`, \`ls\`, or direct file reads so test proposals align with current test coverage and test implementation realities.`;

const applySteps = `**Steps**
Track these steps as TODOs and complete them one by one.
1. Read \`changes/<id>/proposal.md\`, \`design.md\` (if present), and \`tasks.md\` to confirm test scope and acceptance criteria.
2. Work through tasks sequentially:
   - For test planning: Explore the app, create test plans with scenarios
   - For test generation: Generate Playwright tests from test plans using browser automation
   - For test healing: Debug and fix failing tests systematically
   - Keep edits minimal and focused on the requested test change
3. Confirm completion before updating statuses—make sure every item in \`tasks.md\` is finished and all tests pass.
4. Update the checklist after all work is done so each task is marked \`- [x]\` and reflects reality.
5. Reference \`spectest list\` or \`spectest show <item>\` when additional context is required.`;

const applyReferences = `**Reference**
- Use \`spectest show <id> --json --deltas-only\` if you need additional context from the proposal while implementing.`;

const archiveSteps = `**Steps**
1. Determine the change ID to archive:
   - If this prompt already includes a specific change ID (for example inside a \`<ChangeId>\` block populated by slash-command arguments), use that value after trimming whitespace.
   - If the conversation references a change loosely (for example by title or summary), run \`spectest list\` to surface likely IDs, share the relevant candidates, and confirm which one the user intends.
   - Otherwise, review the conversation, run \`spectest list\`, and ask the user which change to archive; wait for a confirmed change ID before proceeding.
   - If you still cannot identify a single change ID, stop and tell the user you cannot archive anything yet.
2. Validate the change ID by running \`spectest list\` (or \`spectest show <id>\`) and stop if the change is missing, already archived, or otherwise not ready to archive.
3. Run \`spectest archive <id> --yes\` so the CLI moves the change and applies spec updates without prompts (use \`--skip-specs\` only for tooling-only work).
4. Review the command output to confirm the target specs were updated and the change landed in \`changes/archive/\`.
5. Validate with \`spectest validate --strict\` and inspect with \`spectest show <id>\` if anything looks off.`;

const archiveReferences = `**Reference**
- Use \`spectest list\` to confirm change IDs before archiving.
- Inspect refreshed specs with \`spectest list --specs\` and address any validation issues before handing off.`;

export const slashCommandBodies: Record<SlashCommandId, string> = {
  proposal: [proposalGuardrails, proposalSteps, proposalReferences].join('\n\n'),
  apply: [baseGuardrails, applySteps, applyReferences].join('\n\n'),
  archive: [baseGuardrails, archiveSteps, archiveReferences].join('\n\n')
};

export function getSlashCommandBody(id: SlashCommandId): string {
  return slashCommandBodies[id];
}
