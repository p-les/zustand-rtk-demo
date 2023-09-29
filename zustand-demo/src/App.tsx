import './App.css';
import { Messages } from '@zustand/messages/messages';
import { Posts } from './zustand/posts/posts';
import Items from './zustand/items/items';
import { useState } from 'react';

function App() {
	const [renderItems, setRenderItems] = useState(true);
	return (
		<>
			<h1>Zustand</h1>
			<Messages />
			<Posts />

			<Items name="First" />
			<br />
			<button onClick={() => setRenderItems(!renderItems)}>toggle second</button>
			<br />

			{renderItems && <Items name="Second" />}
		</>
	);
}

export default App;
