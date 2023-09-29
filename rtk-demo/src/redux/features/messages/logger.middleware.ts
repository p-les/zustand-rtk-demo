import type { Middleware } from 'redux';
import type { RootState } from '@store';

export const logger =
	(slice: keyof RootState): Middleware<{}, RootState> =>
	store =>
	next =>
	action => {
		console.log(`[${String(slice)}] Dispatching:`, action);
		const result = next(action);
		console.log(`[${String(slice)}] State after dispatch:`, store.getState()[slice]);
		return result;
	};
