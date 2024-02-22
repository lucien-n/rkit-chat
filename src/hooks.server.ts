import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleLucia } from './hooks/handleLucia';
import { handleRemult } from './hooks/handleRemult';

export const handle: Handle = sequence(handleLucia, handleRemult);
