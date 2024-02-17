import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleRemult } from './hooks/handleRemult';
import { handleLucia } from './hooks/handleLucia';

export const handle: Handle = sequence(handleLucia, handleRemult);
