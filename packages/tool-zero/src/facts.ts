import type { ToolFamilyFacts } from '@teamai/tool-core/family';
import { tools } from './definitions.js';

/** Zero (零号员工): no session platform and no version detector. */
export const facts = { tools, platforms: {}, detect: {} } as const satisfies ToolFamilyFacts;
