import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleLucia } from './hooks/handleLucia';

export const handle: Handle = sequence(handleLucia);
