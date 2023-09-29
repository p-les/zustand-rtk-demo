import { create } from 'zustand';

export interface Item {
	id: number;
	name: string;
}

export interface ItemsState {
	items: Item[];
	addItem: (name: string) => void;
	removeItem: (id: number) => void;
}

export const createItemStore = () => {
	return create<ItemsState>(set => ({
		items: [],
		addItem: name =>
			set(state => ({
				items: [...state.items, { name, id: state.items.length + 1 }],
			})),
		removeItem: id =>
			set(state => ({
				items: state.items.filter(item => item.id !== id),
			})),
	}));
};
