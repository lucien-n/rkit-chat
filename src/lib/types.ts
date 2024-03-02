import type { ActionResult } from '@sveltejs/kit';

export type DispatchActionResult = Record<ActionResult['type'], ActionResult>;
