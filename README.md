<p align="center">
  <a href="https://github.com/speckits/spectest">
    <picture>
      <img src="assets/spectest.png" alt="SpecTest logo" height="64">
    </picture>
  </a>
  
</p>
<p align="center">Spec-driven automation test development for AI coding assistants.</p>
<p align="center"><em>Forked from <a href="https://github.com/speckits/openspec">OpenSpec</a> and optimized for Playwright test automation</em></p>
<p align="center">
  <a href="https://github.com/speckits/spectest/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/speckits/spectest/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@speckit/spectest"><img alt="npm version" src="https://img.shields.io/npm/v/@speckit/spectest?style=flat-square" /></a>
  <a href="https://nodejs.org/"><img alt="node version" src="https://img.shields.io/node/v/@speckit/spectest?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
</p>

# SpecTest

**SpecTest** is a specialized fork of [OpenSpec](https://github.com/Fission-AI/OpenSpec), optimized for automation test development. It extends OpenSpec's spec-driven test development workflow with specialized instructions, prompts, and workflows for creating, planning, and maintaining automated tests—particularly with Playwright.

**No API keys required.**

## About SpecTest

SpecTest is inspired by and forked from [OpenSpec](https://github.com/Fission-AI/OpenSpec), an excellent general-purpose spec-driven development tool. While OpenSpec focuses on general software development, SpecTest specializes in automation test development, making it the ideal choice for teams building and maintaining test suites.

### Key Differences from OpenSpec

| Feature | OpenSpec | SpecTest |
|---------|----------|----------|
| **Focus** | General software development | **Automation test development** |
| **Workflows** | General change proposals | **Test planning, generation, healing, coverage** |
| **Instructions** | General development guidance | **Playwright & automation test best practices** |
| **Use Case** | Building features, APIs, apps | **Creating and maintaining test suites** |
| **Package** | `@fission-ai/openspec` | `@speckit/spectest` |
| **CLI** | `openspec` | `spectest` |
| **Directory** | `openspec/` | `spectest/` |

### When to Choose SpecTest vs OpenSpec

**Choose SpecTest if:**
- ✅ You're building automation test suites (Playwright, Cypress, etc.)
- ✅ You need specialized workflows for test planning and generation
- ✅ You want AI assistants optimized for test creation and maintenance
- ✅ You're working on test coverage, test healing, and test quality

**Choose OpenSpec if:**
- ✅ You're building general software (APIs, web apps, libraries)
- ✅ You need a general-purpose spec-driven development workflow
- ✅ You want the original, battle-tested tool

Both tools share the same core spec-driven test development philosophy and workflow. SpecTest adds test-specific enhancements while maintaining full compatibility with OpenSpec's file structure and concepts.

## Why SpecTest?

AI coding assistants are powerful but unpredictable when test requirements live in chat history. SpecTest adds a lightweight specification workflow that locks test intent before test implementation, giving you deterministic, reviewable test outputs—especially for test development.

Key outcomes:
- Human and AI stakeholders agree on test specs before test implementation begins.
- Structured change folders (proposals, tasks, and spec updates) keep test scope explicit and auditable.
- Specialized workflows for test planning, generation, healing, and coverage analysis.
- Works with the AI tools you already use: custom slash commands where supported, context rules everywhere else.
- **Playwright-optimized**: Built-in workflows and best practices for Playwright test automation.

## How SpecTest compares (at a glance)

- **Lightweight**: simple workflow, no API keys, minimal setup.
- **Brownfield-first**: works great beyond 0→1. SpecTest separates the source of truth from proposals: `spectest/specs/` (current test coverage) and `spectest/changes/` (proposed test updates). This keeps test diffs explicit and manageable across test suites.
- **Change tracking**: test proposals, tasks, and spec deltas live together; archiving merges the approved test updates back into specs.
- **Compared to spec-kit & Kiro**: those shine for brand-new test suites (0→1). SpecTest also excels when improving existing test coverage (1→n), especially when updates span multiple test specs.

See the full comparison in [How SpecTest Compares](#how-spectest-compares).

## How It Works

SpecTest follows the same proven workflow as OpenSpec, but with specialized support for test development:

```
┌────────────────────┐
│ Draft Test         │
│ Proposal/Plan      │
└────────┬───────────┘
         │ share test intent with your AI
         ▼
┌────────────────────┐
│ Review & Align     │
│ (edit test specs/  │◀──── feedback loop ──────┐
│  test plans)       │                          │
└────────┬───────────┘                          │
         │ approved test plan                   │
         ▼                                      │
┌────────────────────┐                          │
│ Generate Tests     │──────────────────────────┘
│ (AI creates         │
│  Playwright tests) │
└────────┬───────────┘
         │ test & heal if needed
         ▼
┌────────────────────┐
│ Archive & Update   │
│ Test Specs         │
└────────────────────┘

1. Draft a test proposal/plan that captures the test scenarios you need.
2. Review the test plan with your AI assistant until everyone agrees.
3. Generate Playwright tests from the approved test plan.
4. Heal any failing tests using the test healing workflow.
5. Archive the change to merge the approved test specs back into the source-of-truth.
```

### For Test Development

When working with tests, SpecTest provides specialized workflows:

- **Test Planning**: AI explores your application under test and creates comprehensive test plans
- **Test Generation**: AI generates Playwright tests from test plans using real browser automation
- **Test Healing**: AI systematically debugs and fixes failing tests
- **Coverage Analysis**: AI identifies test gaps and suggests additional scenarios

## Getting Started

### Supported AI Tools

<details>
<summary><strong>Native Slash Commands</strong> (click to expand)</summary>

These tools have built-in SpecTest commands. Select the SpecTest integration when prompted.

| Tool | Commands |
|------|----------|
| **Amazon Q Developer** | `@spectest-proposal`, `@spectest-apply`, `@spectest-archive` (`.amazonq/prompts/`) |
| **Antigravity** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.agent/workflows/`) |
| **Auggie (Augment CLI)** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.augment/commands/`) |
| **Claude Code** | `/spectest:proposal`, `/spectest:apply`, `/spectest:archive` |
| **Cline** | Workflows in `.clinerules/workflows/` directory (`.clinerules/workflows/spectest-*.md`) |
| **CodeBuddy Code (CLI)** | `/spectest:proposal`, `/spectest:apply`, `/spectest:archive` (`.codebuddy/commands/`) — see [docs](https://www.codebuddy.ai/cli) |
| **Codex** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (global: `~/.codex/prompts`, auto-installed) |
| **CoStrict** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.cospec/spectest/commands/`) — see [docs](https://costrict.ai)|
| **Crush** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.crush/commands/spectest/`) |
| **Cursor** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` |
| **Factory Droid** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.factory/commands/`) |
| **Gemini CLI** | `/spectest:proposal`, `/spectest:apply`, `/spectest:archive` (`.gemini/commands/spectest/`) |
| **GitHub Copilot** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.github/prompts/`) |
| **iFlow (iflow-cli)** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.iflow/commands/`) |
| **Kilo Code** | `/spectest-proposal.md`, `/spectest-apply.md`, `/spectest-archive.md` (`.kilocode/workflows/`) |
| **OpenCode** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` |
| **Qoder (CLI)** | `/spectest:proposal`, `/spectest:apply`, `/spectest:archive` (`.qoder/commands/spectest/`) — see [docs](https://qoder.com/cli) |
| **Qwen Code** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.qwen/commands/`) |
| **RooCode** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.roo/commands/`) |
| **Windsurf** | `/spectest-proposal`, `/spectest-apply`, `/spectest-archive` (`.windsurf/workflows/`) |

Kilo Code discovers team workflows automatically. Save the generated files under `.kilocode/workflows/` and trigger them from the command palette with `/spectest-proposal.md`, `/spectest-apply.md`, or `/spectest-archive.md`.

</details>

<details>
<summary><strong>AGENTS.md Compatible</strong> (click to expand)</summary>

These tools automatically read workflow instructions from `spectest/AGENTS.md`. Ask them to follow the SpecTest workflow if they need a reminder. Learn more about the [AGENTS.md convention](https://agents.md/).

| Tools |
|-------|
| Amp • Jules • Others |

</details>

### Install & Initialize

#### Prerequisites
- **Node.js >= 20.19.0** - Check your version with `node --version`

#### Step 1: Install the CLI globally

```bash
npm install -g @speckit/spectest@latest
```

Verify installation:
```bash
spectest --version
```

#### Step 2: Initialize SpecTest in your test project

Navigate to your test project directory:
```bash
cd my-project
```

Run the initialization:
```bash
spectest init
```

**What happens during initialization:**
- You'll be prompted to pick any natively supported AI tools (Claude Code, CodeBuddy, Cursor, OpenCode, Qoder, etc.); other assistants always rely on the shared `AGENTS.md` stub
- SpecTest automatically configures slash commands for the tools you choose and always writes a managed `AGENTS.md` hand-off at the project root
- A new `spectest/` directory structure is created in your test project

**After setup:**
- Primary AI tools can trigger `/spectest` workflows without additional configuration
- Run `spectest list` to verify the setup and view any active changes
- If your coding assistant doesn't surface the new slash commands right away, restart it. Slash commands are loaded at startup, so a fresh launch ensures they appear

**Note:** Playwright configuration files are scaffolded automatically during the apply workflow when needed for test automation changes, not during init.

### Optional: Populate Test Project Context

After `spectest init` completes, you'll receive a suggested prompt to help populate your test project context:

```text
Populate your test project context:
"Please read spectest/project.md and help me fill it out with details about my test project, test tech stack, and test conventions"
```

Use `spectest/project.md` to define project-level test conventions, standards, test patterns, and other guidelines that should be followed across all test changes.

### Create Your First Test Change

Here's a real example showing the complete SpecTest workflow for test development. This works with any AI tool. Those with native slash commands will recognize the shortcuts automatically.

#### 1. Draft the Test Plan
Start by asking your AI to create a test plan:

```text
You: Create a test plan for the login page functionality
     (Shortcut for tools with slash commands: /spectest:proposal Create test plan for login page)

AI:  I'll create a test plan for the login page.
     *Explores the login page, identifies scenarios, and scaffolds spectest/changes/add-login-tests/ 
      with proposal.md, tasks.md, and test spec deltas.*
```

#### 2. Verify & Review
Check that the test plan was created correctly and review it:

```bash
$ spectest list                             # Confirm the change folder exists
$ spectest validate add-login-tests          # Validate test spec formatting
$ spectest show add-login-tests             # Review proposal, tasks, and test spec delta
```

#### 3. Refine the Test Plan
Iterate on the test plan until it covers all scenarios:

```text
You: Can you add test cases for password reset and remember me functionality?

AI:  I'll update the test spec delta with additional scenarios for password reset and remember me.
     *Edits spectest/changes/add-login-tests/specs/login-tests/spec.md and tasks.md.*
```

#### 4. Generate Tests
Once the test plan looks good, generate Playwright tests:

```text
You: The test plan looks good. Let's generate the Playwright tests.
     (Shortcut for tools with slash commands: /spectest:apply add-login-tests)

AI:  I'll work through the tasks in the add-login-tests change.
     *Uses test generation workflow to create Playwright tests from the test plan*
     *Executes steps in browser and generates Playwright test code*
     *Runs tests with report and screenshot generation*
     *Marks tasks complete: Task 1.1 ✓, Task 2.1 ✓, Task 2.2 ✓...*
```

**After implementing test changes, tests are automatically run with:**
- HTML report generated in `playwright-report/` directory
- Screenshots captured on test failures in `test-results/` directory
- Review the HTML report at `playwright-report/index.html` to verify test results

#### 5. Heal Tests (if needed)
If any tests fail, use the test healing workflow:

```text
You: Some tests are failing. Please fix them.

AI:  I'll use the test healing workflow to debug and fix the failing tests.
     *Runs tests, identifies failures, debugs systematically, and fixes issues*
     *Verifies all tests pass*
```

#### 6. Archive the Completed Change
After all tests pass, archive the change:

```text
AI:  All tests are passing. The test suite is ready.

You: Please archive the change
     (Shortcut for tools with slash commands: /spectest:archive add-login-tests)

AI:  I'll archive the add-login-tests change.
    *Runs: spectest archive add-login-tests --yes*
     ✓ Change archived successfully. Test specs updated. Ready for the next test suite!
```

Or run the command yourself in terminal:
```bash
$ spectest archive add-login-tests --yes  # Archive the completed change without prompts
```

**Note:** Tools with native slash commands (Claude Code, CodeBuddy, Cursor, Codex, Qoder, RooCode) can use the shortcuts shown. All other tools work with natural language requests to "create a test plan", "generate Playwright tests", "heal failing tests", or "archive the change".

## Command Reference

```bash
spectest init                    # Initialize SpecTest in your project
spectest list                    # View active test change folders
spectest list --specs            # View test specifications
spectest view                    # Interactive dashboard of test specs and changes
spectest show <change>           # Display test change details (proposal, tasks, test spec updates)
spectest validate <change>       # Check test spec formatting and structure
spectest archive <change> [--yes|-y]   # Move a completed test change into archive/
```

## Example: How AI Creates SpecTest Files

When you ask your AI assistant to "create a test plan for user login", it creates:

```
spectest/
├── specs/
│   └── login-tests/
│       └── spec.md           # Current login test spec (if exists)
└── changes/
    └── add-login-tests/      # AI creates this entire structure
        ├── proposal.md       # Why and what test changes
        ├── tasks.md          # Test implementation checklist
        ├── design.md         # Test strategy decisions (optional)
        └── specs/
            └── login-tests/
                └── spec.md   # Delta showing test additions
```

### AI-Generated Test Spec (created in `spectest/specs/login-tests/spec.md`):

```markdown
# Login Tests Specification

## Purpose
Automated tests for user authentication and login functionality.

## Requirements
### Requirement: Login Form Validation Tests
The test suite SHALL validate login form inputs before submission.

#### Scenario: Valid credentials
- WHEN a user submits valid credentials
- THEN the user is authenticated and redirected to dashboard
```

### AI-Generated Change Delta (created in `spectest/changes/add-login-tests/specs/login-tests/spec.md`):

```markdown
# Delta for Login Tests

## ADDED Requirements
### Requirement: Login Error Handling Tests
The test suite MUST test error scenarios during login.

#### Scenario: Invalid credentials
- WHEN a user submits invalid credentials
- THEN an error message is displayed
- AND the user remains on the login page
```

### AI-Generated Tasks (created in `spectest/changes/add-login-tests/tasks.md`):

```markdown
## 1. Test Planning
- [ ] 1.1 Create test plan for login scenarios
- [ ] 1.2 Identify test cases and edge cases

## 2. Test Generation  
- [ ] 2.1 Generate Playwright test for valid login
- [ ] 2.2 Generate test for invalid credentials
- [ ] 2.3 Generate test for empty form submission

## 3. Test Execution & Healing
- [ ] 3.1 Run tests and fix any failures
- [ ] 3.2 Verify all tests pass
```

**Important:** You don't create these files manually. Your AI assistant generates them based on your test requirements and the existing test codebase.

## Understanding SpecTest Files

### Delta Format

Deltas are "patches" that show how test specs change:

- **`## ADDED Requirements`** - New test capabilities
- **`## MODIFIED Requirements`** - Changed test behavior (include complete updated text)
- **`## REMOVED Requirements`** - Deprecated test scenarios

**Format requirements:**
- Use `### Requirement: <name>` for test requirement headers
- Every test requirement needs at least one `#### Scenario:` block
- Use SHALL/MUST in test requirement text

## SpecTest's Automation Test Workflows

SpecTest includes specialized workflows optimized for automation test development:

### Test Planning Workflow
- **Explore & Analyze**: Navigate and explore web applications under test to understand user flows
- **Design Scenarios**: Create comprehensive test scenarios covering happy paths, edge cases, and error handling
- **Structure Plans**: Generate detailed test plans with step-by-step instructions and expected outcomes

### Test Generation Workflow
- **From Plans to Tests**: Automatically generate Playwright tests from test plans
- **Real-time Execution**: Use browser automation tools to execute steps and generate reliable Playwright test code
- **Best Practices**: Follow Playwright best practices automatically in generated tests

### Test Healing Workflow
- **Debug Systematically**: Identify and fix failing tests methodically
- **Root Cause Analysis**: Examine selectors, timing issues, and application under test changes
- **Iterative Fixes**: Fix tests one at a time with verification after each change

### Test Coverage Workflow
- **Coverage Analysis**: Identify untested features to test and critical test paths
- **Gap Identification**: Find missing test scenarios and edge cases
- **Comprehensive Planning**: Create test plans that ensure full coverage

These workflows are integrated into the main `spectest/AGENTS.md` template, making them available to all AI assistants working with your test project.

## How SpecTest Compares

### vs. OpenSpec
SpecTest is a specialized fork of OpenSpec, optimized for automation test development. While OpenSpec excels at general software development, SpecTest adds:
- **Test-specific workflows**: Planning, generation, healing, and coverage analysis
- **Playwright optimization**: Built-in best practices and patterns for Playwright tests
- **Test-focused instructions**: AI assistants receive specialized guidance for test development

**Choose SpecTest for test development, OpenSpec for general development.**

### vs. spec-kit
SpecTest's two-folder model (`spectest/specs/` for the current test coverage, `spectest/changes/` for proposed test updates) keeps test state and diffs separate. This scales when you modify existing test suites or touch multiple test specs. spec-kit is strong for greenfield/0→1 but provides less structure for cross-spec updates and evolving test suites.

### vs. Kiro.dev
SpecTest groups every test change in one folder (`spectest/changes/test-name/`), making it easy to track related test specs, tasks, and designs together. Kiro spreads updates across multiple spec folders, which can make test change tracking harder.

### vs. No Specs
Without specs, AI coding assistants generate tests from vague prompts, often missing test scenarios or adding unwanted test cases. SpecTest brings predictability by agreeing on test behavior and coverage before any test code is written.

## Team Adoption

1. **Initialize SpecTest** – Run `spectest init` in your test project.
2. **Start with test planning** – Ask your AI to create test plans for features to test or existing functionality to test.
3. **Generate tests systematically** – Use the test generation workflow to create Playwright tests from test plans.
4. **Maintain test quality** – Use test healing and coverage workflows to keep your test suite healthy.
5. **Grow incrementally** – Each change archives into living test specs that document your test coverage.
6. **Stay flexible** – Different teammates can use Claude Code, CodeBuddy, Cursor, or any AGENTS.md-compatible tool while sharing the same test specs.

Run `spectest update` whenever someone switches tools so your agents pick up the latest test-specific instructions and slash-command bindings.

## Updating SpecTest

1. **Upgrade the package**
   ```bash
   npm install -g @speckit/spectest@latest
   ```
2. **Refresh agent instructions**
   - Run `spectest update` inside each test project to regenerate AI guidance and ensure the latest slash commands are active.

## Acknowledgments

SpecTest is a fork of [OpenSpec](https://github.com/speckits/openspec), created by the OpenSpec contributors. We are grateful for their excellent work on the original project, which inspired and enabled SpecTest. OpenSpec's spec-driven test development philosophy and architecture form the foundation of SpecTest.

**Thank you to the OpenSpec team and community for building such a great tool!**

## Contributing

- Install dependencies: `pnpm install`
- Build: `pnpm run build`
- Test: `pnpm test`
- Develop CLI locally: `pnpm run dev` or `pnpm run dev:cli`
- Conventional commits (one-line): `type(scope): subject`

## License

MIT
