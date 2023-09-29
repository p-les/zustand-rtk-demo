import { renderHook, act } from '@testing-library/react';
import type { StoreApi, UseBoundStore } from 'zustand';

const setupStore = <T>(
	useStore: UseBoundStore<StoreApi<T>>,
	defaultState?: Partial<T>
) => {
	const initialState = useStore.getState();

	if (defaultState) {
		act(() => {
			useStore.setState(defaultState);
		});
	}

	const { result } = renderHook(() => useStore());

	const reset = () => {
		act(() => {
			useStore.setState(initialState, true);
		});
	};

	return {
		result,
		reset,
	};
};

export { setupStore };
