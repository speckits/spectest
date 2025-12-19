export const agentsTemplate = `# SpecTest Instructions

Instructions for AI coding assistants using SpecTest for spec-first Playwright test automation.

## TL;DR Quick Checklist

- Search existing work: \`spectest spec list --long\`, \`spectest list\` (use \`rg\` only for full-text search)
- Decide scope: new test capability vs modify existing test capability
- Pick a unique \`change-id\`: kebab-case, verb-led (\`add-\`, \`update-\`, \`remove-\`, \`refactor-\`)
- Scaffold: \`proposal.md\`, \`tasks.md\`, \`design.md\` (only if needed), and delta test specs per affected test capability
- Write deltas: use \`## ADDED|MODIFIED|REMOVED|RENAMED Requirements\`; include at least one \`#### Scenario:\` per requirement describing test steps (WHEN) and expected outcomes (THEN)
- Validate: \`spectest validate [change-id] --strict\` and fix issues
- Request approval: Do not start implementation until test change proposal is approved

## Three-Stage Workflow

### Stage 1: Creating Test Changes
Create test change proposal when you need to:
- Add new test scenarios or test capabilities
- Modify existing test behavior or coverage
- Change test architecture or patterns  
- Update test automation workflows
- Integrate with Playwright Test Agents

Triggers (examples):
- "Help me create a change proposal"
- "Help me plan a change"
- "Help me create a proposal"
- "I want to create a spec proposal"
- "I want to create a spec"

Loose matching guidance:
- Contains one of: \`proposal\`, \`change\`, \`spec\`
- With one of: \`create\`, \`plan\`, \`make\`, \`start\`, \`help\`

Skip proposal for:
- Bug fixes (restore intended behavior)
- Typos, formatting, comments
- Dependency updates (non-breaking)
- Configuration changes
- Tests for existing behavior

**Workflow**
1. Review \`spectest/project.md\`, \`spectest list\`, and \`spectest list --specs\` to understand current test context.
2. Choose a unique verb-led \`change-id\` and scaffold \`proposal.md\`, \`tasks.md\`, optional \`design.md\`, and test spec deltas under \`spectest/changes/<id>/\`.
3. Draft test spec deltas using \`## ADDED|MODIFIED|REMOVED Requirements\` with at least one \`#### Scenario:\` per requirement describing test steps (WHEN) and expected outcomes (THEN).
4. Run \`spectest validate <id> --strict\` and resolve any issues before sharing the test change proposal.

### Stage 2: Implementing Test Changes
Track these steps as TODOs and complete them one by one.
1. **Read proposal.md** - Understand what test changes are being implemented
2. **Read design.md** (if exists) - Review technical decisions for test automation
3. **Read tasks.md** - Get test implementation checklist
4. **Implement tasks sequentially** - Complete in order (may include generating test plans, test code, or manual test implementation)
5. **After implementing test changes, run tests with report and screenshot generation**:
   - Run \`npm test\` (or \`pnpm test\` / \`yarn test\` depending on package manager)
   - Tests will automatically generate HTML report in \`playwright-report/\` directory
   - Screenshots will be captured on test failures in \`test-results/\` directory
   - Review the HTML report at \`playwright-report/index.html\` to verify test results
6. **Confirm completion** - Ensure every item in \`tasks.md\` is finished before updating statuses
7. **Update checklist** - After all work is done, set every task to \`- [x]\` so the list reflects reality
8. **Approval gate** - Do not start implementation until the test change proposal is reviewed and approved

### Stage 3: Archiving Test Changes
After test implementation is complete, create separate PR to:
- Move \`changes/[name]/\` → \`changes/archive/YYYY-MM-DD-[name]/\`
- Update \`specs/\` if test capabilities changed
- Use \`spectest archive <change-id> --skip-specs --yes\` for tooling-only changes (always pass the change ID explicitly)
- Run \`spectest validate --strict\` to confirm the archived test change passes checks

## Before Any Task

**Context Checklist:**
- [ ] Read relevant specs in \`specs/[capability]/spec.md\`
- [ ] Check pending changes in \`changes/\` for conflicts
- [ ] Read \`spectest/project.md\` for conventions
- [ ] Run \`spectest list\` to see active changes
- [ ] Run \`spectest list --specs\` to see existing capabilities

**Before Creating Specs:**
- Always check if capability already exists
- Prefer modifying existing specs over creating duplicates
- Use \`spectest show [spec]\` to review current state
- If request is ambiguous, ask 1–2 clarifying questions before scaffolding

### Search Guidance
- Enumerate test specs: \`spectest spec list --long\` (or \`--json\` for scripts)
- Enumerate test changes: \`spectest list\` (or \`spectest change list --json\` - deprecated but available)
- Show details:
  - Test Spec: \`spectest show <spec-id> --type spec\` (use \`--json\` for filters)
  - Test Change: \`spectest show <change-id> --json --deltas-only\`
- Full-text search (use ripgrep): \`rg -n "Requirement:|Scenario:" spectest/specs\`

## Quick Start

### CLI Commands

\`\`\`bash
# Essential commands
spectest list                  # List active test changes
spectest list --specs          # List test specifications
spectest show [item]           # Display test change or test spec
spectest validate [item]       # Validate test changes or test specs
spectest archive <change-id> [--yes|-y]   # Archive after test implementation (add --yes for non-interactive runs)

# Project management
spectest init [path]           # Initialize SpecTest
spectest init-playwright       # Scaffold Playwright configuration
spectest update [path]         # Update instruction files

# Playwright integration
spectest plan <spec-id>        # Generate test plan from test spec (Playwright planner)
spectest generate <plan-file>  # Generate Playwright tests from test plan (Playwright generator)
spectest heal                  # Heal failing tests (Playwright healer)

# Interactive mode
spectest show                  # Prompts for selection
spectest validate              # Bulk validation mode

# Debugging
spectest show [change] --json --deltas-only
spectest validate [change] --strict
\`\`\`

### Command Flags

- \`--json\` - Machine-readable output
- \`--type change|spec\` - Disambiguate items
- \`--strict\` - Comprehensive validation
- \`--no-interactive\` - Disable prompts
- \`--skip-specs\` - Archive without spec updates
- \`--yes\`/\`-y\` - Skip confirmation prompts (non-interactive archive)

## Directory Structure

\`\`\`
spectest/
├── project.md              # Project conventions
├── specs/                  # Current truth - what IS built
│   └── [capability]/       # Single focused capability
│       ├── spec.md         # Requirements and scenarios
│       └── design.md       # Technical patterns
├── changes/                # Proposals - what SHOULD change
│   ├── [change-name]/
│   │   ├── proposal.md     # Why, what, impact
│   │   ├── tasks.md        # Implementation checklist
│   │   ├── design.md       # Technical decisions (optional; see criteria)
│   │   └── specs/          # Delta changes
│   │       └── [capability]/
│   │           └── spec.md # ADDED/MODIFIED/REMOVED
│   └── archive/            # Completed changes
\`\`\`

## Creating Change Proposals

### Decision Tree

\`\`\`
New request?
├─ Bug fix restoring spec behavior? → Fix directly
├─ Typo/format/comment? → Fix directly  
├─ New feature/capability? → Create proposal
├─ Breaking change? → Create proposal
├─ Architecture change? → Create proposal
└─ Unclear? → Create proposal (safer)
\`\`\`

### Proposal Structure

1. **Create directory:** \`changes/[change-id]/\` (kebab-case, verb-led, unique)

2. **Write proposal.md:**
\`\`\`markdown
# Change: [Brief description of change]

## Why
[1-2 sentences on problem/opportunity]

## What Changes
- [Bullet list of changes]
- [Mark breaking changes with **BREAKING**]

## Impact
- Affected specs: [list capabilities]
- Affected code: [key files/systems]
\`\`\`

3. **Create spec deltas:** \`specs/[capability]/spec.md\`
\`\`\`markdown
## ADDED Requirements
### Requirement: New Feature
The system SHALL provide...

#### Scenario: Success case
- **WHEN** user performs action
- **THEN** expected result

## MODIFIED Requirements
### Requirement: Existing Feature
[Complete modified requirement]

## REMOVED Requirements
### Requirement: Old Feature
**Reason**: [Why removing]
**Migration**: [How to handle]
\`\`\`
If multiple capabilities are affected, create multiple delta files under \`changes/[change-id]/specs/<capability>/spec.md\`—one per capability.

4. **Create tasks.md:**
\`\`\`markdown
## 1. Implementation
- [ ] 1.1 Create database schema
- [ ] 1.2 Implement API endpoint
- [ ] 1.3 Add frontend component
- [ ] 1.4 Write tests
\`\`\`

5. **Create design.md when needed:**
Create \`design.md\` if any of the following apply; otherwise omit it:
- Cross-cutting change (multiple services/modules) or a new architectural pattern
- New external dependency or significant data model changes
- Security, performance, or migration complexity
- Ambiguity that benefits from technical decisions before coding

Minimal \`design.md\` skeleton:
\`\`\`markdown
## Context
[Background, constraints, stakeholders]

## Goals / Non-Goals
- Goals: [...]
- Non-Goals: [...]

## Decisions
- Decision: [What and why]
- Alternatives considered: [Options + rationale]

## Risks / Trade-offs
- [Risk] → Mitigation

## Migration Plan
[Steps, rollback]

## Open Questions
- [...]
\`\`\`

## Spec File Format

### Critical: Scenario Formatting

**CORRECT** (use #### headers):
\`\`\`markdown
#### Scenario: User login success
- **WHEN** valid credentials provided
- **THEN** return JWT token
\`\`\`

**WRONG** (don't use bullets or bold):
\`\`\`markdown
- **Scenario: User login**  ❌
**Scenario**: User login     ❌
### Scenario: User login      ❌
\`\`\`

Every requirement MUST have at least one scenario.

### Requirement Wording
- Use SHALL/MUST for normative requirements (avoid should/may unless intentionally non-normative)

### Delta Operations

- \`## ADDED Requirements\` - New capabilities
- \`## MODIFIED Requirements\` - Changed behavior
- \`## REMOVED Requirements\` - Deprecated features
- \`## RENAMED Requirements\` - Name changes

Headers matched with \`trim(header)\` - whitespace ignored.

#### When to use ADDED vs MODIFIED
- ADDED: Introduces a new capability or sub-capability that can stand alone as a requirement. Prefer ADDED when the change is orthogonal (e.g., adding "Slash Command Configuration") rather than altering the semantics of an existing requirement.
- MODIFIED: Changes the behavior, scope, or acceptance criteria of an existing requirement. Always paste the full, updated requirement content (header + all scenarios). The archiver will replace the entire requirement with what you provide here; partial deltas will drop previous details.
- RENAMED: Use when only the name changes. If you also change behavior, use RENAMED (name) plus MODIFIED (content) referencing the new name.

Common pitfall: Using MODIFIED to add a new concern without including the previous text. This causes loss of detail at archive time. If you aren’t explicitly changing the existing requirement, add a new requirement under ADDED instead.

Authoring a MODIFIED requirement correctly:
1) Locate the existing requirement in \`spectest/specs/<capability>/spec.md\`.
2) Copy the entire requirement block (from \`### Requirement: ...\` through its scenarios).
3) Paste it under \`## MODIFIED Requirements\` and edit to reflect the new behavior.
4) Ensure the header text matches exactly (whitespace-insensitive) and keep at least one \`#### Scenario:\`.

Example for RENAMED:
\`\`\`markdown
## RENAMED Requirements
- FROM: \`### Requirement: Login\`
- TO: \`### Requirement: User Authentication\`
\`\`\`

## Troubleshooting

### Common Errors

**"Change must have at least one delta"**
- Check \`changes/[name]/specs/\` exists with .md files
- Verify files have operation prefixes (## ADDED Requirements)

**"Requirement must have at least one scenario"**
- Check scenarios use \`#### Scenario:\` format (4 hashtags)
- Don't use bullet points or bold for scenario headers

**Silent scenario parsing failures**
- Exact format required: \`#### Scenario: Name\`
- Debug with: \`spectest show [change] --json --deltas-only\`

### Validation Tips

\`\`\`bash
# Always use strict mode for comprehensive checks
spectest validate [change] --strict

# Debug delta parsing
spectest show [change] --json | jq '.deltas'

# Check specific requirement
spectest show [spec] --json -r 1
\`\`\`

## Happy Path Script

\`\`\`bash
# 1) Explore current state
spectest spec list --long
spectest list
# Optional full-text search:
# rg -n "Requirement:|Scenario:" spectest/specs
# rg -n "^#|Requirement:" spectest/changes

# 2) Choose test change id and scaffold
CHANGE=add-login-flow-tests
mkdir -p spectest/changes/$CHANGE/{specs/auth}
printf "## Why\\n...\\n\\n## What Changes\\n- ...\\n\\n## Impact\\n- ...\\n" > spectest/changes/$CHANGE/proposal.md
printf "## 1. Test Implementation\\n- [ ] 1.1 ...\\n" > spectest/changes/$CHANGE/tasks.md

# 3) Add test spec deltas (example)
cat > spectest/changes/$CHANGE/specs/auth/spec.md << 'EOF'
## ADDED Requirements
### Requirement: Login Flow Tests
The system SHALL have test coverage for user login flows.

#### Scenario: Valid credentials login
- **WHEN** a user submits valid credentials
- **THEN** the user is authenticated and redirected to dashboard
EOF

# 4) Validate
spectest validate $CHANGE --strict
\`\`\`

## Multi-Capability Example

\`\`\`
spectest/changes/add-2fa-notify/
├── proposal.md
├── tasks.md
└── specs/
    ├── auth/
    │   └── spec.md   # ADDED: Two-Factor Authentication
    └── notifications/
        └── spec.md   # ADDED: OTP email notification
\`\`\`

auth/spec.md
\`\`\`markdown
## ADDED Requirements
### Requirement: Two-Factor Authentication
...
\`\`\`

notifications/spec.md
\`\`\`markdown
## ADDED Requirements
### Requirement: OTP Email Notification
...
\`\`\`

## Best Practices

### Simplicity First
- Default to <100 lines of new code
- Single-file implementations until proven insufficient
- Avoid frameworks without clear justification
- Choose boring, proven patterns

### Complexity Triggers
Only add complexity with:
- Performance data showing current solution too slow
- Concrete scale requirements (>1000 users, >100MB data)
- Multiple proven use cases requiring abstraction

### Clear References
- Use \`file.ts:42\` format for code locations
- Reference specs as \`specs/auth/spec.md\`
- Link related changes and PRs

### Capability Naming
- Use verb-noun: \`user-auth\`, \`payment-capture\`
- Single purpose per capability
- 10-minute understandability rule
- Split if description needs "AND"

### Change ID Naming
- Use kebab-case, short and descriptive: \`add-two-factor-auth\`
- Prefer verb-led prefixes: \`add-\`, \`update-\`, \`remove-\`, \`refactor-\`
- Ensure uniqueness; if taken, append \`-2\`, \`-3\`, etc.

## Tool Selection Guide

| Task | Tool | Why |
|------|------|-----|
| Find files by pattern | Glob | Fast pattern matching |
| Search code content | Grep | Optimized regex search |
| Read specific files | Read | Direct file access |
| Explore unknown scope | Task | Multi-step investigation |

## Error Recovery

### Test Change Conflicts
1. Run \`spectest list\` to see active test changes
2. Check for overlapping test specs
3. Coordinate with test change owners
4. Consider combining test proposals

### Validation Failures
1. Run with \`--strict\` flag
2. Check JSON output for details
3. Verify spec file format
4. Ensure scenarios properly formatted

### Missing Context
1. Read project.md first
2. Check related specs
3. Review recent archives
4. Ask for clarification

## Quick Reference

### Stage Indicators
- \`changes/\` - Proposed test changes, not yet implemented
- \`specs/\` - Implemented and deployed test specs
- \`archive/\` - Completed test changes

### File Purposes
- \`proposal.md\` - Why and what test changes
- \`tasks.md\` - Test implementation steps
- \`design.md\` - Technical decisions for test automation
- \`spec.md\` - Test requirements, scenarios, steps, and expected outcomes

### CLI Essentials
\`\`\`bash
spectest list              # What test changes are in progress?
spectest show [item]       # View test change or test spec details
spectest validate --strict # Is the test spec correct?
spectest archive <change-id> [--yes|-y]  # Mark test change complete (add --yes for automation)
spectest plan <spec-id>    # Generate test plan from test spec
spectest generate <plan>   # Generate Playwright tests from test plan
spectest heal              # Heal failing tests
\`\`\`

Remember: Test specs are truth. Test changes are proposals. Keep them in sync.
`;
