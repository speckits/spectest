export interface ProjectContext {
  projectName?: string;
  description?: string;
  techStack?: string[];
  conventions?: string;
}

export const projectTemplate = (context: ProjectContext = {}) => `# ${context.projectName || 'Test Project'} Context

## Purpose
${context.description || '[Describe your test project\'s purpose and goals - e.g., "Automated test suite for web application login and user management flows"]'}

## Tech Stack
${context.techStack?.length ? context.techStack.map(tech => `- ${tech}`).join('\n') : '- [List your automation technologies]\n- [e.g., Playwright, TypeScript, Node.js]'}

## Test Project Conventions

### Test Code Style
[Describe your test code style preferences, formatting rules, and naming conventions for test files]

### Test Architecture Patterns
[Document your test architecture decisions and patterns - e.g., page object model, test fixtures, test data management]

### Testing Strategy
[Explain your automation approach and requirements]
- Framework: Playwright
- Spec format: SpecTest (human-readable test specs)
- Generation: Use Playwright Test Agents (planner, generator, healer)
- Maintenance: Automated healing for failing tests
- Planning: Create test plans before generating tests
- Coverage: Focus on critical user flows and edge cases

### Git Workflow
[Describe your branching strategy and commit conventions for test changes]

## Domain Context
[Add domain-specific knowledge about the application under test that AI assistants need to understand for planning and generation]

## Important Constraints
[List any technical, business, or regulatory constraints affecting automation - e.g., data requirements, environment limitations, performance targets]

## Application Under Test
[Document key external services, APIs, or systems that the application under test depends on - needed for setup and mocking]
`;