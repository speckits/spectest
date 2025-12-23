export const agentsTemplate = `# SpecTest Instructions

Instructions for AI coding assistants using SpecTest for spec-first Playwright automation.

## TL;DR Quick Checklist

- Search existing work: \`spectest spec list --long\`, \`spectest list\` (use \`rg\` only for full-text search)
- Decide scope: new test capability vs modify existing test capability
- Pick a unique \`change-id\`: kebab-case, verb-led (\`add-\`, \`update-\`, \`remove-\`, \`refactor-\`)
- Scaffold: \`proposal.md\`, \`tasks.md\`, \`design.md\` (only if needed), and spec deltas per affected test capability
- Write deltas: use \`## ADDED|MODIFIED|REMOVED|RENAMED Requirements\`; include at least one \`#### Scenario:\` per requirement describing test steps (WHEN) and expected outcomes (THEN)
- Validate: \`spectest validate [change-id] --strict\` and fix issues
- Request approval: Do not start implementation until change proposal is approved

## Three-Stage Workflow

### Stage 1: Creating Changes
Create change proposal when you need to:
- Add new test scenarios or test capabilities
- Modify existing test behavior or test coverage
- Change test architecture or patterns  
- Update automation workflows
- Integrate with Playwright Test Agents

Triggers (examples):
- "Help me create a test change proposal"
- "Help me plan test scenarios"
- "Help me create a test proposal"
- "I want to create a test spec proposal"
- "I want to create a test spec"
- "Generate test plan for login flow"
- "Create test coverage for payment flow"
- "Plan tests for user registration"

Loose matching guidance:
- Contains one of: \`proposal\`, \`change\`, \`spec\`
- With one of: \`create\`, \`plan\`, \`make\`, \`start\`, \`help\`

Skip proposal for:
- Test bug fixes (restore intended test behavior)
- Typos, formatting, comments in test files
- Dependency updates (non-breaking)
- Test configuration changes (playwright.config.ts updates)
- Minor test code refactoring without changing test behavior
- Updating test data without changing scenarios

**Workflow**
1. Review \`spectest/project.md\`, \`spectest list\`, and \`spectest list --specs\` to understand current context.
2. Choose a unique verb-led \`change-id\` and scaffold \`proposal.md\`, \`tasks.md\`, optional \`design.md\`, and spec deltas under \`spectest/changes/<id>/\`.
3. Draft spec deltas using \`## ADDED|MODIFIED|REMOVED Requirements\` with at least one \`#### Scenario:\` per test requirement describing test steps (WHEN) and expected outcomes (THEN).
4. Run \`spectest validate <id> --strict\` and resolve any issues before sharing the change proposal.

### Stage 2: Implementing Changes
Track these steps as TODOs and complete them one by one.
1. **Read proposal.md** - Understand what changes are being implemented
2. **Read design.md** (if exists) - Review technical decisions
3. **Read tasks.md** - Get test implementation checklist
4. **Implement tasks sequentially** - Complete in order:
   - **For test planning**: Use \`spectest plan <spec-id>\` to explore app and create test plans
   - **For test generation**: Use \`spectest generate <plan-file>\` to transform plans into tests
   - **For test healing**: Use \`spectest heal\` to automatically fix failing tests
   - **For other tasks**: Complete manually or with appropriate tools
5. **After implementing changes, run tests with report and screenshot generation**:
   - Run \`npm test\` (or \`pnpm test\` / \`yarn test\` depending on package manager)
   - Tests will automatically generate HTML report in \`playwright-report/\` directory
   - Screenshots will be captured on test failures in \`test-results/\` directory
   - Review the HTML report at \`playwright-report/index.html\` to verify test results
6. **Confirm completion** - Ensure every item in \`tasks.md\` is finished before updating statuses
7. **Update checklist** - After all work is done, set every task to \`- [x]\` so the list reflects reality
8. **Approval gate** - Do not start implementation until the change proposal is reviewed and approved

### Stage 3: Archiving Test Changes
After test implementation is complete, create separate PR to:
- Move \`changes/[name]/\` → \`changes/archive/YYYY-MM-DD-[name]/\`
- Update \`specs/\` if test capabilities changed
- Use \`spectest archive <change-id> --skip-specs --yes\` for tooling-only changes (always pass the change ID explicitly)
- Run \`spectest validate --strict\` to confirm the archived change passes checks

## Before Any Task

**Context Checklist:**
- [ ] Read relevant test specs in \`specs/[test-capability]/spec.md\`
- [ ] Check pending changes in \`changes/\` for conflicts
- [ ] Read \`spectest/project.md\` for conventions
- [ ] Run \`spectest list\` to see active changes
- [ ] Run \`spectest list --specs\` to see existing capabilities

**Before Creating Specs:**
- Always check if test capability already exists
- Prefer modifying existing specs over creating duplicates
- Use \`spectest show [spec]\` to review current state
- If request is ambiguous, ask 1–2 clarifying questions before scaffolding

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
spectest archive <change-id> [--yes|-y]   # Archive after implementation (add --yes for non-interactive runs)

# Project management
spectest init [path]           # Initialize SpecTest
spectest init-playwright       # Scaffold Playwright configuration
spectest update [path]         # Update instruction files

# Playwright integration
spectest plan <spec-id>        # Generate plan from spec (Playwright planner)
spectest generate <plan-file>  # Generate Playwright tests from plan (Playwright generator)
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
├── specs/                  # Current truth - what IS tested
│   └── [test-capability]/  # Single focused test capability
│       ├── spec.md         # Test requirements and scenarios
│       └── design.md       # Test technical patterns
├── changes/                # Proposals - what SHOULD be tested
│   ├── [change-name]/
│   │   ├── proposal.md     # Why, what, impact
│   │   ├── tasks.md        # Test implementation checklist
│   │   ├── design.md       # Test technical decisions (optional; see criteria)
│   │   └── specs/          # Test delta changes
│   │       └── [test-capability]/
│   │           └── spec.md # ADDED/MODIFIED/REMOVED
│   └── archive/            # Completed changes
\`\`\`

## Creating Change Proposals

### Decision Tree

\`\`\`
New request?
├─ Bug fix restoring spec behavior? → Fix directly
├─ Typo/format/comment? → Fix directly  
├─ New capability or requirement? → Create proposal
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

3. **Create spec deltas:** \`specs/[test-capability]/spec.md\`
\`\`\`markdown
## ADDED Requirements
### Requirement: Login Flow Tests
The test suite SHALL provide coverage for user login flows.

#### Scenario: Valid credentials login
- **WHEN** a user submits valid credentials
- **THEN** the user is authenticated and redirected to dashboard

## MODIFIED Requirements
### Requirement: Login Flow Tests
[Complete modified requirement with updated scenarios]

## REMOVED Requirements
### Requirement: Legacy Login Tests
**Reason**: [Why removing this requirement]
**Migration**: [How to handle existing coverage]
\`\`\`
If multiple test capabilities are affected, create multiple delta files under \`changes/[change-id]/specs/<test-capability>/spec.md\`—one per test capability.

4. **Create tasks.md:**
\`\`\`markdown
## 1. Planning
- [ ] 1.1 Create plan for login scenarios
- [ ] 1.2 Identify test cases and edge cases

## 2. Generation
- [ ] 2.1 Generate Playwright test for valid login
- [ ] 2.2 Generate test for invalid credentials
- [ ] 2.3 Generate test for empty form submission

## 3. Execution & Healing
- [ ] 3.1 Run tests and fix any failures
- [ ] 3.2 Verify all tests pass
\`\`\`

5. **Create design.md when needed:**
Create \`design.md\` if any of the following apply; otherwise omit it:
- Cross-cutting change (multiple capabilities) or a new architectural pattern
- New framework dependency or significant infrastructure changes
- Complex setup/teardown requirements or data management
- Performance requirements or execution optimization needs
- Ambiguity that benefits from technical decisions before generating tests

Minimal \`design.md\` skeleton:
\`\`\`markdown
## Context
[Background, application under test constraints, environment requirements]

## Goals / Non-Goals
- Goals: [Coverage goals, execution requirements]
- Non-Goals: [Out of scope scenarios, excluded areas]

## Architecture Decisions
- Decision: [Framework choices, organization patterns]
- Alternatives considered: [Other approaches + rationale]

## Infrastructure
- Data management: [How data is created/managed]
- Environment setup: [Required environments, configuration]
- Execution strategy: [Parallel execution, isolation approach]

## Risks / Trade-offs
- [Reliability risk] → Mitigation strategy
- [Maintenance complexity] → Trade-off analysis

## Migration Plan
[Steps for updating existing tests, rollback strategy if tests break]

## Open Questions
- [Unresolved scenarios, ambiguous requirements]
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
- \`## REMOVED Requirements\` - Deprecated requirements
- \`## RENAMED Requirements\` - Name changes

Headers matched with \`trim(header)\` - whitespace ignored.

#### When to use ADDED vs MODIFIED
- ADDED: Introduces a new test capability or test requirement that can stand alone. Prefer ADDED when the change is orthogonal (e.g., adding "Login Flow Tests") rather than altering the semantics of an existing test requirement.
- MODIFIED: Changes the behavior, scope, or acceptance criteria of an existing test requirement. Always paste the full, updated requirement content (header + all scenarios). The archiver will replace the entire requirement with what you provide here; partial deltas will drop previous details.
- RENAMED: Use when only the name changes. If you also change behavior, use RENAMED (name) plus MODIFIED (content) referencing the new name.

Common pitfall: Using MODIFIED to add a new concern without including the previous text. This causes loss of detail at archive time. If you aren't explicitly changing the existing test requirement, add a new test requirement under ADDED instead.

Authoring a MODIFIED requirement correctly:
1) Locate the existing test requirement in \`spectest/specs/<test-capability>/spec.md\`.
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
printf "# Change: Add Login Flow Tests\\n\\n## Why\\nWe need coverage for user login flows to ensure authentication works correctly.\\n\\n## What Changes\\n- Add scenarios for valid login\\n- Add scenarios for invalid credentials\\n- Add scenarios for empty form submission\\n\\n## Impact\\n- Affected specs: auth\\n- Affected test files: tests/auth/login.spec.ts\\n" > spectest/changes/$CHANGE/proposal.md
printf "## 1. Planning\\n- [ ] 1.1 Create plan for login scenarios\\n- [ ] 1.2 Identify edge cases (invalid credentials, empty fields)\\n\\n## 2. Generation\\n- [ ] 2.1 Generate Playwright test for valid login\\n- [ ] 2.2 Generate test for invalid credentials\\n- [ ] 2.3 Generate test for empty form submission\\n\\n## 3. Execution & Healing\\n- [ ] 3.1 Run tests and verify they pass\\n- [ ] 3.2 Review HTML report for any issues\\n" > spectest/changes/$CHANGE/tasks.md

# 3) Add test spec deltas (example)
cat > spectest/changes/$CHANGE/specs/auth/spec.md << 'EOF'
## ADDED Requirements
### Requirement: Login Flow Tests
The system SHALL have coverage for user login flows.

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

## Test Automation Best Practices

### Playwright Test Patterns

#### Selector Strategy (Priority Order)
1. **Data attributes** (most stable): \`page.locator('[data-testid="submit-button"]')\`
2. **Role-based selectors** (accessible): \`page.getByRole('button', { name: 'Submit' })\`
3. **Text content** (for unique text): \`page.getByText('Sign in')\`
4. **Semantic HTML**: \`page.locator('button[type="submit"]')\`
5. **Avoid**: Classes and IDs (can change frequently)
6. **Last resort**: Complex CSS/XPath selectors

#### Waiting Strategies
- **Use auto-waiting**: Playwright automatically waits for elements to be actionable
- **Wait for states**: \`waitFor({ state: 'visible' })\`, \`waitFor({ state: 'hidden' })\`
- **Wait for navigation**: \`waitForURL('**/dashboard')\`
- **Wait for load**: \`waitForLoadState('networkidle')\`, \`waitForLoadState('domcontentloaded')\`
- **Wait for response**: \`waitForResponse('**/api/users')\`
- **Custom timeouts**: Set specific timeouts for slow operations
- **Never use**: \`page.waitForTimeout()\` or \`sleep()\` - use proper waiting strategies instead

#### Test Structure
- **Use fixtures**: \`test('name', async ({ page }) => { ... })\`
- **Arrange-Act-Assert pattern**: Structure tests clearly
- **Test isolation**: Each test should be independent and runnable in any order
- **Page Object Model**: Use for complex test suites to improve maintainability

#### Assertions
- **Page assertions**: \`expect(page).toHaveTitle('My App')\`, \`expect(page).toHaveURL('/dashboard')\`
- **Element visibility**: \`expect(locator).toBeVisible()\`, \`expect(locator).toBeHidden()\`
- **Text content**: \`expect(locator).toHaveText('Welcome')\`, \`expect(locator).toContainText('success')\`
- **Input values**: \`expect(locator).toHaveValue('test@example.com')\`, \`expect(locator).toBeEmpty()\`
- **Attributes**: \`expect(locator).toHaveAttribute('type', 'submit')\`
- **Count**: \`expect(locator).toHaveCount(5)\`
- **State**: \`expect(checkbox).toBeChecked()\`, \`expect(button).toBeEnabled()\`

#### Error Handling
- **Try-catch blocks**: Wrap operations that might fail
- **Screenshots on failure**: Automatically captured in \`test-results/\`
- **HTML reports**: Always run tests with HTML reporter for debugging
- **Console logs**: Use \`console.log()\` to track progress and debug issues
- **Page errors**: Listen to \`page.on('pageerror')\` for JavaScript errors

### Test Planning Best Practices

#### Planning Workflow (Playwright Test Agents)
- **Use Playwright Planner**: \`spectest plan <spec-id>\` to explore app and create test plans
- **Seed test reference**: Include \`seed.spec.ts\` in planning context for environment setup and test patterns

**Planning Process:**
1. **Setup page**: Invoke \`planner_setup_page\` tool once before using any other tools
2. **Navigate and explore**: Use browser tools to navigate and discover interface
   - Explore browser snapshots to understand UI structure
   - Identify all interactive elements, forms, navigation paths
   - Do not take screenshots unless absolutely necessary
   - Thoroughly explore the interface to understand functionality
3. **Analyze user flows**: Map out primary user journeys and identify critical paths
   - Consider different user types and their typical behaviors
   - Identify navigation patterns and user interactions
4. **Design scenarios**: Create detailed test scenarios covering:
   - Happy path scenarios (normal user behavior)
   - Edge cases and boundary conditions
   - Error handling and validation
5. **Structure test plan**: Each scenario must include:
   - Clear, descriptive title
   - Detailed step-by-step instructions
   - Expected outcomes where appropriate
   - Assumptions about starting state (always assume blank/fresh state)
   - Success criteria and failure conditions
6. **Save plan**: Submit test plan using \`planner_save_plan\` tool as markdown file

#### Scenario Design
- **Start with user flows**: Identify critical user journeys first
- **Cover edge cases**: Include negative scenarios, error handling, boundary conditions
- **Prioritize by risk**: Focus on high-risk areas (payments, authentication, data integrity)
- **Use GIVEN-WHEN-THEN format**: Structure scenarios clearly for generation
- **Keep scenarios atomic**: One scenario = one test case
- **Include assumptions**: Document starting state (always assume blank/fresh state)

#### Plan Structure
- **Clear headings**: Use descriptive titles for test groups
- **Numbered steps**: Detailed step-by-step instructions
- **Expected outcomes**: Document what should happen at each step
- **Success criteria**: Define what constitutes a passing test
- **Professional formatting**: Use markdown with clear headings, numbered steps, suitable for sharing with development and QA teams

#### Quality Standards for Planning
- **Write specific steps**: Steps should be specific enough for any tester to follow
- **Include negative testing**: Cover negative scenarios and error cases
- **Ensure independence**: Scenarios should be independent and runnable in any order
- **Comprehensive coverage**: Cover happy paths, edge cases, and error handling

### Test Generation Best Practices

#### Generation Workflow (Playwright Test Agents)
- **Use Playwright Generator**: \`spectest generate <plan-file>\` to transform plans into tests
- **Real-time execution**: Generator verifies selectors and assertions live as it performs scenarios
- **From plans to tests**: Read markdown plan from \`specs/\` directory
- **Seed test usage**: Reference \`seed.spec.ts\` for environment setup and test patterns

**Generation Process (for each test):**
1. **Obtain test plan**: Read the test plan with all steps and verification specifications
2. **Setup page**: Run \`generator_setup_page\` tool to set up page for the scenario
3. **Execute steps**: For each step and verification in the scenario:
   - Use Playwright tool to manually execute it in real-time
   - Use the step description as the intent for each Playwright tool call
   - Verify selectors and assertions live as you perform the scenario
4. **Retrieve log**: Get generator log via \`generator_read_log\` to see best practices used
5. **Write test**: Immediately after reading the log, invoke \`generator_write_test\` with generated source code:
   - File should contain single test
   - File name must be fs-friendly scenario name
   - Test must be placed in a describe matching the top-level test plan item
   - Test title must match the scenario name
   - Include a comment with the step text before each step execution
   - Always use best practices from the log when generating tests

#### Test Code Quality
- **Follow Playwright conventions**: Use fixtures, proper selectors, error handling
- **Verify selectors**: Generator verifies selectors live during generation
- **Include step comments**: Add comments with step text before each action
- **Use assertions catalog**: Leverage Playwright's comprehensive assertion library
- **Match plan structure**: Align test structure with plan (describe blocks, test names)

#### Test Organization
- **Keep tests focused**: One test file per capability or user flow
- **Use descriptive test names**: Test names should clearly describe what is being tested
- **Include assertions**: Every test should verify expected outcomes
- **File naming**: Use fs-friendly scenario names (e.g., \`add-valid-todo.spec.ts\`)

#### Quality Standards for Generation
- **Simple and maintainable**: Keep tests straightforward and maintainable
- **Accurate simulation**: Tests should accurately simulate user interactions
- **Reliable validation**: Tests should validate application behavior correctly
- **Test structure**: Match test structure with plan (describe blocks, test names)
- **Step comments**: Include comments with step text before each action
- **Best practices**: Always use best practices from generator log

### Test Healing Best Practices

#### Healing Workflow (Playwright Test Agents)
- **Use Playwright Healer**: \`spectest heal\` to automatically fix failing tests
- **Systematic debugging**: Replay failing steps, inspect UI, suggest patches
- **Iterative fixes**: Fix one issue at a time, retest after each fix
- **Continue until passing**: Healer re-runs tests until they pass or guardrails stop the loop

#### Debugging Process (7-Step Workflow)
1. **Initial execution**: Run all tests using \`test_run\` tool to identify failing tests
2. **Debug failed tests**: For each failing test, run \`test_debug\` to pause on errors
3. **Error investigation**: When test pauses on errors, use available Playwright tools to:
   - Examine the error details
   - Capture page snapshot using \`browser_snapshot\` to understand context
   - Analyze selectors, timing issues, or assertion failures
   - Check console messages via \`browser_console_messages\`
   - Review network requests via \`browser_network_requests\`
4. **Root cause analysis**: Determine underlying cause by examining:
   - Element selectors that may have changed (use \`browser_generate_locator\` to find equivalent)
   - Timing and synchronization issues
   - Data dependencies or test environment problems
   - Application changes that broke test assumptions
5. **Code remediation**: Edit test code to address identified issues:
   - Update selectors to match current application state
   - Fix assertions and expected values
   - Improve test reliability and maintainability
   - For inherently dynamic data, utilize regular expressions for resilient locators
6. **Verification**: Restart the test after each fix to validate the changes
7. **Iteration**: Repeat investigation and fixing process until test passes cleanly

#### Fix Strategies
- **Selector updates**: Use \`browser_generate_locator\` to find equivalent elements
- **Timing fixes**: Adjust waits, use proper waiting strategies
- **Data fixes**: Update test data or use regular expressions for dynamic content
- **Assertion updates**: Fix expected values to match current application state
- **Mark as fixme**: If test is correct but functionality is broken, use \`test.fixme()\` with explanation

#### Best Practices
- **Be systematic and thorough**: Use methodical debugging approach, prefer straightforward fixes over complex workarounds
- **Document findings**: Document your findings and reasoning for each fix
- **Fix one at a time**: If multiple errors exist, fix them one at a time and retest
- **Provide clear explanations**: Explain what was broken and how you fixed it
- **Continue until passing**: Continue process until test runs successfully without failures or errors
- **Mark as fixme when appropriate**: If error persists and you have high confidence test is correct, mark as \`test.fixme()\` with comment explaining what's happening instead of expected behavior
- **Review failure reports**: Check HTML reports and screenshots in \`test-results/\`
- **Update selectors carefully**: Ensure changes don't break other tests
- **Verify test intent**: After healing, verify test still validates the original requirement
- **Never use deprecated APIs**: Never wait for \`networkidle\` or use other discouraged or deprecated APIs

### Test Execution & Validation

#### Test Execution Workflow
1. **Run test suites**: Execute all relevant test suites using appropriate test runners
   - Use \`npm test\`, \`pnpm test\`, or \`yarn test\` for Playwright tests
   - Run tests in clean environment when possible
2. **Validate test results**: Check that all tests pass successfully
   - Identify and report any failing tests with detailed error messages
   - Check for flaky tests that may pass/fail intermittently
3. **Generate reports**: Always run tests with HTML reporter for debugging
   - HTML report generated in \`playwright-report/\` directory
   - Screenshots captured on test failures in \`test-results/\` directory
   - Review HTML report at \`playwright-report/index.html\` to verify test results
4. **Analyze failures**: For failing tests, use healing workflow to fix issues

#### Test Quality Standards
- **Test isolation**: Ensure tests are independent and can be run in any order
- **Deterministic tests**: Tests should be deterministic and reproducible
- **Proper cleanup**: Ensure test data cleanup after execution
- **Error handling**: Verify error handling mechanisms are properly tested
- **Edge cases**: Ensure edge cases and boundary conditions are covered
- **Never ignore failures**: Never ignore failing tests just to pass the build

### Test Coverage Analysis

#### Coverage Workflow
1. **Identify gaps**: Compare test specs with application features
   - Analyze existing test coverage against application functionality
   - Identify untested features and critical paths
2. **Prioritize critical paths**: Focus on user-facing functionality first
   - High-risk areas: payments, authentication, data integrity
   - User journeys: critical user flows and navigation paths
3. **Generate coverage plan**: Use Playwright Planner to create comprehensive test plan
   - Task: the coverage task to perform
   - Seed file: reference \`seed.spec.ts\` for environment setup
   - Test plan file: save plan under \`specs/\` folder
4. **Generate tests systematically**: For each test case from plan, generate tests one after another (not in parallel)
5. **Heal failing tests**: After generation, run healer to fix any failing tests
6. **Track coverage metrics**: Use Playwright coverage reports to identify untested areas
7. **Review regularly**: Update test specs as application evolves

#### Coverage Best Practices
- **Comprehensive planning**: Create test plans that ensure full coverage
- **Gap identification**: Find missing test scenarios and edge cases
- **Coverage reports**: Generate and analyze code coverage reports
- **Critical areas**: Ensure all critical paths have test coverage
- **Coverage targets**: Aim for 80%+ coverage on critical paths

### Test Code Organization
- **One test file per capability**: \`tests/login.spec.ts\`, \`tests/payment.spec.ts\`
- **Use fixtures for shared setup**: \`tests/fixtures.ts\` for common test utilities (authentication, test data factories)
- **Keep tests simple**: Default to <100 lines per test file
- **Use helper functions**: Extract common test steps into reusable functions
- **Seed test pattern**: Use \`seed.spec.ts\` as reference template for test structure and patterns

#### Common Helper Patterns
- **Safe interactions**: Use retry logic for clicks and type operations
- **Cookie banners**: Handle cookie acceptance dialogs automatically
- **Form interactions**: Use \`getByLabel\`, \`getByPlaceholder\` for form fields
- **File uploads**: Use \`setInputFiles()\` for file upload scenarios
- **Dropdowns**: Use \`selectOption()\` with label, value, or index
- **Table data extraction**: Extract table data for validation
- **Popups**: Use \`waitForEvent('popup')\` for handling new windows
- **Downloads**: Use \`waitForEvent('download')\` for file downloads
- **iFrames**: Use \`frameLocator()\` to interact with iframe content
- **Infinite scroll**: Scroll to bottom and wait for content to load
- **Drag and drop**: Use \`dragAndDrop()\` for drag operations
- **Keyboard shortcuts**: Use \`keyboard.press('Control+A')\` for key combinations

### Clear References
- Use \`file.ts:42\` format for code locations
- Reference test specs as \`specs/auth/spec.md\`
- Link related changes and PRs
- Document test data requirements in specs

### Capability Naming
- Use verb-noun: \`user-auth-tests\`, \`payment-flow-tests\`, \`checkout-tests\`
- Single purpose per capability
- 10-minute understandability rule
- Split if description needs "AND" (e.g., split "login and registration" into two capabilities)

### Change ID Naming
- Use kebab-case, short and descriptive: \`add-login-flow-tests\`, \`update-payment-tests\`
- Prefer verb-led prefixes: \`add-\`, \`update-\`, \`remove-\`, \`refactor-\`, \`heal-\`
- Ensure uniqueness; if taken, append \`-2\`, \`-3\`, etc.

## Tool Selection Guide

| Task | Tool | Why |
|------|------|-----|
| Find test files by pattern | Glob | Fast pattern matching for \`tests/**/*.spec.ts\` |
| Search code content | Grep | Optimized regex search for patterns |
| Read test files | Read | Direct file access to test implementations |
| Explore coverage | Task | Multi-step investigation of gaps |
| Generate plans | \`spectest plan\` | Create plans from specs |
| Generate Playwright tests | \`spectest generate\` | Generate tests from plans |
| Heal failing tests | \`spectest heal\` | Automatically fix test failures |
| View test reports | Browser | Open \`playwright-report/index.html\` for detailed analysis |

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
1. Read \`spectest/project.md\` first for project conventions
2. Check related specs in \`spectest/specs/\`
3. Review recent change archives for patterns
4. Run \`spectest list --specs\` to see existing coverage
5. Ask for clarification about requirements or application behavior

## Quick Reference

### Stage Indicators
- \`changes/\` - Proposed changes, not yet implemented
- \`specs/\` - Implemented and deployed specs
- \`archive/\` - Completed changes

### File Purposes
- \`proposal.md\` - Why and what changes
- \`tasks.md\` - Implementation steps
- \`design.md\` - Technical decisions
- \`spec.md\` - Requirements, scenarios, steps, and expected outcomes

### CLI Essentials
\`\`\`bash
spectest list              # What changes are in progress?
spectest show [item]       # View change or spec details
spectest validate --strict # Is the spec correct?
spectest archive <change-id> [--yes|-y]  # Mark change complete (add --yes for non-interactive)
spectest plan <spec-id>    # Generate plan from spec
spectest generate <plan>   # Generate Playwright tests from plan
spectest heal              # Heal failing tests
\`\`\`

Remember: Specs are truth. Changes are proposals. Keep them in sync.
`;
