import { ItemStoreProvider, useItemStore } from './items.provider';

interface ItemsProps {
	name: string;
}

const Items = ({ name }: ItemsProps) => {
	const store = useItemStore();
	const items = store(state => state.items);
	const removeItem = store(state => state.removeItem);
	const addItem = store(state => state.addItem);
	return (
		<div>
			<h1>{name} Items</h1>
			<button onClick={() => addItem(`item ${items.length + 1}`)}>Add Item</button>
			{items.map(item => (
				<div key={item.id}>
					{item.name}
					<button onClick={() => removeItem(item.id)}>Remove</button>
				</div>
			))}
		</div>
	);
};

export default ({ name }: ItemsProps) => (
	<ItemStoreProvider>
		<Items name={name} />
	</ItemStoreProvider>
);
