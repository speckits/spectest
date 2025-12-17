export const agentsRootStubTemplate = `# SpecTest Instructions

These instructions are for AI assistants working in this project.

Always open \`@/spectest/AGENTS.md\` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use \`@/spectest/AGENTS.md\` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'spectest update' can refresh the instructions.
`;
