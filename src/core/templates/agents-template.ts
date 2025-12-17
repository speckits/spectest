export const agentsTemplate = `# SpecTest Instructions

Instructions for AI coding assistants using SpecTest for spec-driven automation test development.

## TL;DR Quick Checklist

- Search existing work: \`spectest spec list --long\`, \`spectest list\` (use \`rg\` only for full-text search)
- Decide scope: new test capability vs modify existing test capability
- Pick a unique \`change-id\`: kebab-case, verb-led (\`add-\`, \`update-\`, \`remove-\`, \`refactor-\`)
- Scaffold: \`proposal.md\`, \`tasks.md\`, \`design.md\` (only if needed), and delta specs per affected test capability
- Write deltas: use \`## ADDED|MODIFIED|REMOVED|RENAMED Requirements\`; include at least one \`#### Scenario:\` per test requirement
- Validate: \`spectest validate [change-id] --strict\` and fix issues
- Request approval: Do not start test implementation until proposal is approved

## Three-Stage Workflow

### Stage 1: Creating Changes
Create proposal when you need to:
- Add test coverage for features or functionality
- Create test plans for new or existing features
- Improve test suite (add scenarios, fix gaps)
- Make breaking changes to test infrastructure
- Change test architecture or patterns

Triggers (examples):
- "Help me create a test plan"
- "Create test coverage for [feature]"
- "Generate tests for [scenario]"
- "Add test scenarios"
- "Help me create a change proposal"

Loose matching guidance:
- Contains one of: \`proposal\`, \`change\`, \`spec\`, \`test plan\`, \`test coverage\`
- With one of: \`create\`, \`plan\`, \`make\`, \`start\`, \`help\`, \`generate\`, \`add\`

Skip proposal for:
- Bug fixes (restore intended test behavior)
- Typos, formatting, comments
- Dependency updates (non-breaking)
- Configuration changes

**Workflow**
1. Review \`spectest/project.md\`, \`spectest list\`, and \`spectest list --specs\` to understand current test coverage.
2. Choose a unique verb-led \`change-id\` (e.g., \`add-login-tests\`) and scaffold \`proposal.md\`, \`tasks.md\`, optional \`design.md\`, and spec deltas under \`spectest/changes/<id>/\`.
3. Draft spec deltas using \`## ADDED|MODIFIED|REMOVED Requirements\` with at least one \`#### Scenario:\` per test requirement. Focus on test coverage requirements and test scenarios.
4. Run \`spectest validate <id> --strict\` and resolve any issues before sharing the proposal.

### Stage 2: Implementing Changes
Track these steps as TODOs and complete them one by one.
1. **Read proposal.md** - Understand what test coverage is being added
2. **Read design.md** (if exists) - Review test strategy decisions
3. **Read tasks.md** - Get test implementation checklist
4. **Implement tasks sequentially** - Complete in order:
   - **Test Planning**: Use the test planning workflow to explore the application under test and create test plans
   - **Test Generation**: Use the test generation workflow to create Playwright tests from test plans
   - **Test Healing**: Use the test healing workflow to fix any failing tests
5. **Confirm completion** - Ensure every item in \`tasks.md\` is finished and all tests pass before updating statuses
6. **Update checklist** - After all work is done, set every task to \`- [x]\` so the list reflects reality
7. **Approval gate** - Do not start test implementation until the proposal is reviewed and approved

### Stage 3: Archiving Changes
After test implementation is complete and all tests pass, create separate PR to:
- Move \`changes/[name]/\` → \`changes/archive/YYYY-MM-DD-[name]/\`
- Update \`specs/\` if test capabilities changed
- Use \`spectest archive <change-id> --skip-specs --yes\` for tooling-only changes (always pass the change ID explicitly)
- Run \`spectest validate --strict\` to confirm the archived change passes checks

## Before Any Task

**Context Checklist:**
- [ ] Read relevant test specs in \`specs/[test-capability]/spec.md\`
- [ ] Check pending test changes in \`changes/\` for conflicts
- [ ] Read \`spectest/project.md\` for test conventions
- [ ] Run \`spectest list\` to see active test changes
- [ ] Run \`spectest list --specs\` to see existing test capabilities
- [ ] Review existing test files in \`tests/\` directory to understand current test coverage

**Before Creating Test Specs:**
- Always check if test capability already exists
- Prefer modifying existing test specs over creating duplicates
- Use \`spectest show [spec]\` to review current test coverage
- If request is ambiguous, ask 1–2 clarifying questions about test scenarios before scaffolding

### Search Guidance
- Enumerate specs: \`spectest spec list --long\` (or \`--json\` for scripts)
- Enumerate changes: \`spectest list\` (or \`spectest change list --json\` - deprecated but available)
- Show details:
  - Spec: \`spectest show <spec-id> --type spec\` (use \`--json\` for filters)
  - Change: \`spectest show <change-id> --json --deltas-only\`
- Full-text search (use ripgrep): \`rg -n "Requirement:|Scenario:" spectest/specs\`

## Quick Start

### CLI Commands

\`\`\`bash
# Essential commands
spectest list                  # List active changes
spectest list --specs          # List specifications
spectest show [item]           # Display change or spec
spectest validate [item]       # Validate changes or specs
spectest archive <change-id> [--yes|-y]   # Archive after all tests pass (add --yes for non-interactive runs)

# Project management
spectest init [path]           # Initialize SpecTest
spectest update [path]         # Update instruction files

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
├── specs/                  # Current truth - what tests ARE written
│   └── [test-capability]/  # Single focused test capability
│       ├── spec.md         # Test requirements and scenarios
│       └── design.md       # Test strategy patterns
├── changes/                # Test proposals - what tests SHOULD be added/updated
│   ├── [change-name]/
│   │   ├── proposal.md     # Why, what, impact
│   │   ├── tasks.md        # Test implementation checklist
│   │   ├── design.md       # Test strategy decisions (optional; see criteria)
│   │   └── specs/          # Test delta changes
│   │       └── [test-capability]/
│   │           └── spec.md # ADDED/MODIFIED/REMOVED test requirements
│   └── archive/            # Completed changes
\`\`\`

## Creating Change Proposals

### Decision Tree

\`\`\`
New test request?
├─ Bug fix restoring intended test behavior? → Fix directly
├─ Typo/format/comment in test files? → Fix directly  
├─ Add test coverage for feature? → Create proposal
├─ Improve test suite? → Create proposal
├─ Update test infrastructure? → Create proposal
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
- Affected test specs: [list test capabilities]
- Affected test code: [key test files/test systems]
\`\`\`

3. **Create spec deltas:** \`specs/[test-capability]/spec.md\`
\`\`\`markdown
## ADDED Requirements
### Requirement: Login Test Coverage
The test suite SHALL have comprehensive test coverage for login functionality.

#### Scenario: Valid login
- **WHEN** user provides valid credentials
- **THEN** user is authenticated and redirected

#### Scenario: Invalid credentials
- **WHEN** user provides invalid credentials
- **THEN** error message is displayed

## MODIFIED Requirements
### Requirement: Existing Test Coverage
[Complete modified test requirement]

## REMOVED Requirements
### Requirement: Old Test Scenario
**Reason**: [Why removing]
**Migration**: [How to handle]
\`\`\`
If multiple test capabilities are affected, create multiple delta files under \`changes/[change-id]/specs/<test-capability>/spec.md\`—one per test capability.

4. **Create tasks.md:**
\`\`\`markdown
## 1. Test Planning
- [ ] 1.1 Explore application under test and identify test scenarios
- [ ] 1.2 Create test plan with happy paths and edge cases
- [ ] 1.3 Document test scenarios in test plan

## 2. Test Generation
- [ ] 2.1 Generate Playwright tests from test plan
- [ ] 2.2 Verify test files are created correctly

## 3. Test Validation
- [ ] 3.1 Run tests and identify failures
- [ ] 3.2 Fix failing tests using test healing workflow
- [ ] 3.3 Ensure all tests pass
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

Every test requirement MUST have at least one test scenario.

### Test Requirement Wording
- Use SHALL/MUST for normative test requirements (avoid should/may unless intentionally non-normative)

### Delta Operations

- \`## ADDED Requirements\` - New capabilities
- \`## MODIFIED Requirements\` - Changed test behavior
- \`## REMOVED Requirements\` - Deprecated test scenarios
- \`## RENAMED Requirements\` - Name changes

Headers matched with \`trim(header)\` - whitespace ignored.

#### When to use ADDED vs MODIFIED
- ADDED: Introduces a new test capability or sub-capability that can stand alone as a test requirement. Prefer ADDED when the change is orthogonal (e.g., adding "Login Test Coverage") rather than altering the semantics of an existing test requirement.
- MODIFIED: Changes the test behavior, scope, or acceptance criteria of an existing test requirement. Always paste the full, updated test requirement content (header + all scenarios). The archiver will replace the entire test requirement with what you provide here; partial deltas will drop previous details.
- RENAMED: Use when only the name changes. If you also change behavior, use RENAMED (name) plus MODIFIED (content) referencing the new name.

Common pitfall: Using MODIFIED to add a new test concern without including the previous text. This causes loss of detail at archive time. If you aren't explicitly changing the existing test requirement, add a new test requirement under ADDED instead.

Authoring a MODIFIED test requirement correctly:
1) Locate the existing test requirement in \`spectest/specs/<test-capability>/spec.md\`.
2) Copy the entire test requirement block (from \`### Requirement: ...\` through its scenarios).
3) Paste it under \`## MODIFIED Requirements\` and edit to reflect the new test behavior.
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

# 2) Choose change id and scaffold
CHANGE=add-login-tests
mkdir -p spectest/changes/$CHANGE/{specs/login-tests}
printf "## Why\\nAdd test coverage for login functionality\\n\\n## What Changes\\n- Create test plan for login scenarios\\n- Generate Playwright tests\\n- Ensure all tests pass\\n" > spectest/changes/$CHANGE/proposal.md
printf "## 1. Test Planning\\n- [ ] 1.1 Create test plan\\n## 2. Test Generation\\n- [ ] 2.1 Generate tests\\n" > spectest/changes/$CHANGE/tasks.md

# 3) Add deltas (example)
cat > spectest/changes/$CHANGE/specs/login-tests/spec.md << 'EOF'
## ADDED Requirements
### Requirement: Login Test Coverage
The test suite SHALL have comprehensive test coverage for login functionality.

#### Scenario: Valid login
- **WHEN** user provides valid credentials
- **THEN** user is authenticated and redirected

#### Scenario: Invalid credentials
- **WHEN** user provides invalid credentials
- **THEN** error message is displayed
EOF

# 4) Validate
spectest validate $CHANGE --strict
\`\`\`

## Multi-Capability Example

\`\`\`
spectest/changes/add-checkout-tests/
├── proposal.md
├── tasks.md
└── specs/
    ├── checkout/
    │   └── spec.md   # ADDED: Checkout test coverage
    └── payment/
        └── spec.md   # ADDED: Payment test coverage
\`\`\`

checkout/spec.md
\`\`\`markdown
## ADDED Requirements
### Requirement: Checkout Test Coverage
The test suite SHALL have test coverage for checkout flow.
...
\`\`\`

payment/spec.md
\`\`\`markdown
## ADDED Requirements
### Requirement: Payment Test Coverage
The test suite SHALL have test coverage for payment processing.
...
\`\`\`

## Best Practices

### Simplicity First
- Default to <100 lines of new test code
- Single-file implementations until proven insufficient
- Avoid frameworks without clear justification
- Choose boring, proven patterns

### Complexity Triggers
Only add complexity with:
- Performance data showing current solution too slow
- Concrete scale requirements (>1000 users, >100MB data)
- Multiple proven use cases requiring abstraction

### Clear References
- Use \`file.ts:42\` format for test code locations
- Reference specs as \`specs/auth/spec.md\`
- Link related changes and PRs

### Test Capability Naming
- Use verb-noun: \`login-tests\`, \`checkout-tests\`, \`payment-tests\`
- Single test purpose per test capability
- 10-minute understandability rule
- Split if description needs "AND"

### Change ID Naming
- Use kebab-case, short and descriptive: \`add-login-tests\`, \`improve-checkout-coverage\`
- Prefer verb-led prefixes: \`add-\`, \`update-\`, \`remove-\`, \`refactor-\`, \`improve-\`
- Ensure uniqueness; if taken, append \`-2\`, \`-3\`, etc.

## Tool Selection Guide

| Task | Tool | Why |
|------|------|-----|
| Find files by pattern | Glob | Fast pattern matching |
| Search test code content | Grep | Optimized regex search |
| Read specific files | Read | Direct file access |
| Explore unknown scope | Task | Multi-step investigation |

## Error Recovery

### Change Conflicts
1. Run \`spectest list\` to see active changes
2. Check for overlapping specs
3. Coordinate with change owners
4. Consider combining proposals

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
- \`changes/\` - Proposed, not yet implemented
- \`specs/\` - Tests written and passing
- \`archive/\` - Completed test changes

### File Purposes
- \`proposal.md\` - Why and what test coverage
- \`tasks.md\` - Test implementation steps
- \`design.md\` - Test strategy decisions
- \`spec.md\` - Test requirements and test scenarios

### CLI Essentials
\`\`\`bash
spectest list              # What's in progress?
spectest show [item]       # View details
spectest validate --strict # Is it correct?
spectest archive <change-id> [--yes|-y]  # Mark complete (add --yes for automation)
\`\`\`

## Automation Test Workflows

SpecTest is optimized for automation test development. Use these workflows when working with test plans, test generation, test healing, and test coverage.

### Test Planning Workflow

When asked to create a test plan for a web application under test:

1. **Navigate and Explore**
   - Set up the browser page using available browser automation tools
   - Explore the browser snapshot to understand the interface
   - Use browser tools to navigate and discover all interactive elements, forms, navigation paths, and functionality
   - Do not take screenshots unless absolutely necessary

2. **Analyze User Flows**
   - Map out the primary user journeys and identify critical paths through the application under test
   - Consider different user types and their typical behaviors

3. **Design Comprehensive Scenarios**
   - Create detailed test scenarios covering:
     - Happy path scenarios (normal user behavior)
     - Edge cases and boundary conditions
     - Error handling and validation

4. **Structure Test Plans**
   - Each scenario must include:
     - Clear, descriptive title
     - Detailed step-by-step instructions
     - Expected outcomes where appropriate
     - Assumptions about starting state (always assume blank/fresh state)
     - Success criteria and failure conditions

5. **Create Documentation**
   - Save the test plan as a markdown file with clear headings, numbered steps, and professional formatting
   - Write steps specific enough for any tester to follow
   - Include negative testing scenarios
   - Ensure scenarios are independent and can be run in any order

### Test Generation Workflow

When asked to generate automated tests from a test plan:

1. **Obtain Test Plan**
   - Read the test plan with all steps and verification specifications

2. **Set Up Test Environment**
   - Set up the page for the scenario using available setup tools

3. **Execute Steps**
   - For each step and verification in the scenario:
     - Use browser automation tools to manually execute it in real-time
     - Use the step description as the intent for each tool call

4. **Generate Test Code**
   - Retrieve the test log from the execution
   - Generate test source code following these patterns:
     - File should contain single test
     - File name must be filesystem-friendly scenario name
     - Test must be placed in a describe block matching the top-level test plan item
     - Test title must match the scenario name
     - Include a comment with the step text before each step execution
     - Do not duplicate comments if step requires multiple actions
     - Always use best practices from the log when generating tests

### Test Healing Workflow

When asked to debug and fix failing tests:

1. **Initial Execution**
   - Run all tests to identify failing tests

2. **Debug Failed Tests**
   - For each failing test, run debug mode

3. **Error Investigation**
   - When the test pauses on errors, use available browser automation tools to:
     - Examine the error details
     - Capture page snapshot to understand the context
     - Analyze selectors, timing issues, or assertion failures

4. **Root Cause Analysis**
   - Determine the underlying cause by examining:
     - Element selectors that may have changed
     - Timing and synchronization issues
     - Data dependencies or test environment problems
     - Application under test changes that broke test assumptions

5. **Code Remediation**
   - Edit the test code to address identified issues:
     - Update selectors to match current application under test state
     - Fix assertions and expected values
     - Improve test reliability and maintainability
     - For inherently dynamic data, utilize regular expressions to produce resilient locators

6. **Verification**
   - Restart the test after each fix to validate the changes

7. **Iteration**
   - Repeat the investigation and fixing process until the test passes cleanly
   - Be systematic and thorough
   - Document findings and reasoning for each fix
   - Prefer robust, maintainable solutions over quick hacks
   - If multiple errors exist, fix them one at a time and retest
   - If error persists and you have high confidence the test is correct, mark as \`test.fixme()\` with a comment explaining the issue
   - Never wait for networkidle or use other discouraged or deprecated APIs

### Test Coverage Workflow

When asked to analyze test coverage:

1. **Plan Tests**
   - Call the test planning workflow to create a comprehensive test plan for the given task
   - Include seed file information if provided

2. **Generate Tests**
   - For each test case from the test plan, one after another (not in parallel):
     - Call the test generation workflow
     - Generate test files following the plan structure

3. **Heal Tests**
   - Run all tests and fix failing ones one after another using the test healing workflow

Remember: Specs are truth. Changes are proposals. Keep them in sync.
`;
