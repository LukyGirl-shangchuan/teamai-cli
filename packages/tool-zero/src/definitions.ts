import { type ToolDescriptor } from '@teamai/tool-core/definition';

/** Zero (零号员工), an OpenCode-family CLI whose resources are spread across several roots. */
export const tools = {
  zero: {
    // Zero keeps its config root at ~/.config/zero (XDG_CONFIG_HOME || ~/.config + "zero", read from the
    // zeroagents-teams.zeroagents extension source), but its skills at ~/.zeroagent/skills and its rules at
    // ~/.zerorules, both beside the config root. home names the config root, where its agents and MCP live.
    home: { dir: '.config/zero' },
    // Zero has no hook surface, so teamai cannot observe which skill a tool call loads.
    skillLoad: 'unknown',
    skills: {
      user: [{ base: 'home', path: '.zeroagent/skills', evidence: 'verified' }],
      project: [{ base: 'project', path: '.zeroagent/skills', when: 'workspaceUnder', evidence: 'verified' }],
    },
    // Zero loads every .md under ~/.zerorules (or <root>/.zerorules in a project) straight into its system prompt.
    rules: {
      user: { channel: 'dir', format: 'verbatim', reads: [{ base: 'home', path: '.zerorules', evidence: 'verified' }] },
      project: { channel: 'dir', format: 'verbatim', reads: [{ base: 'project', path: '.zerorules', when: 'workspaceUnder', evidence: 'verified' }] },
    },
    // Zero reads AGENTS.md from its config directory (user) and from the project root, like the OpenCode family it
    // descends from.
    blocks: {
      user: { channel: 'file', file: { in: 'home', path: '.config/zero/AGENTS.md' }, reads: [{ base: 'home', path: '.config/zero/AGENTS.md', evidence: 'source' }] },
      project: { channel: 'file', file: { in: 'project', path: 'AGENTS.md' }, reads: [{ base: 'project', path: 'AGENTS.md', when: 'workspaceUnder', evidence: 'verified' }] },
    },
    agents: {
      user: { reads: [{ base: 'home', path: '.config/zero/agents', evidence: 'verified' }] },
      project: { reads: [{ base: 'project', path: '.zeroagent/agents', when: 'workspaceUnder', evidence: 'source' }] },
    },
    // Zero's MCP files hold their servers bare at the top level, in the same shape OpenCode renders ({ type:
    // local|remote, command, environment, enabled }).
    mcp: {
      user: { format: 'zero', reads: [{ base: 'home', path: '.config/zero/mcp/mcp.json', evidence: 'verified' }] },
      project: { judgedTeamaiOnly: true, format: 'zero', reads: [{ base: 'project', path: '.zeroagent/mcp.json', when: 'workspaceUnder', evidence: 'verified' }] },
    },
    // Zero has no lifecycle-hook surface (its extension ships no hook file).
    hooks: { user: 'unknown', self: 'unknown', subagentStop: false, stopReply: false, shell: 'system', teamHooks: 'home', needsBundle: false },
    sessions: 'none',
    launch: 'none',
    autoCompact: 'none',
    skillAllowedTools: false,
    searchEvidence: true,
    projectFromHome: false,
    legacyAgentMd: false,
    tokens: 'none',
    features: {
      env: '?',
      workflows: '?',
      unattended: '?',
      recall: '?',
      stats: '?',
      tokens: '—t',
      aiBackend: '—t',
      sessionJudge: '?',
      agentHooks: '—t',
    },
  },
} as const satisfies Record<string, ToolDescriptor>;
