import { StateCreator, StoreMutatorIdentifier, create } from 'zustand';

type Logger = <
	T extends unknown,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
	f: StateCreator<T, Mps, Mcs>,
	name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
	f: StateCreator<T, [], []>,
	name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
	const loggedSet: typeof set = (...a) => {
		set(...a);
		console.log(...(name ? [`${name}:`] : []), get());
	};
	store.setState = loggedSet;

	return f(loggedSet, get, store);
};

export const logger = loggerImpl as Logger;

//custom factory that will create a zustand store with a logger middleware
export const createStoreWithLogger = <T>(storeCreator: StateCreator<T>) =>
	create<T>()(logger<T>(storeCreator));
