import type { ToolFamily } from '@teamai/tool-core/family';
import { tools } from './definitions.js';

/** Zero (零号员工). teamai launches no Zero session and reads no Zero token usage. */
export const family = { tools, launch: {}, platforms: {}, tokens: {}, detect: {} } as const satisfies ToolFamily;
