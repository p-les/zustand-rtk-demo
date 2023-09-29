import { ReactNode, createContext, useContext } from 'react';
import { createItemStore, ItemsState } from './item.store';
import { StoreApi, UseBoundStore } from 'zustand';

const ItemStoreContext = createContext<UseBoundStore<StoreApi<ItemsState>> | undefined>(
	undefined
);

export const ItemStoreProvider = ({ children }: { children: ReactNode }) => {
	const itemStore = createItemStore();
	return (
		<ItemStoreContext.Provider value={itemStore}>{children}</ItemStoreContext.Provider>
	);
};

export const useItemStore = () => {
	const store = useContext(ItemStoreContext);
	if (!store) {
		throw new Error('useItemStore must be used within an ItemStoreProvider');
	}
	return store;
};
