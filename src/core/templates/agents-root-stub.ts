export const agentsRootStubTemplate = `# SpecTest Instructions

These instructions are for AI assistants working in this project.

Always open \`@/spectest/AGENTS.md\` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan, test)
- Introduces new capabilities, breaking changes, architecture shifts, or significant automation work
- Sounds ambiguous and you need the authoritative spec before coding tests

Use \`@/spectest/AGENTS.md\` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines
- Automation workflows (planning, generation, healing, coverage analysis)

Keep this managed block so 'spectest update' can refresh the instructions.
`;
