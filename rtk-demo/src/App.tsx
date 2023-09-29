import './App.css';
import { Messages } from '@features/messages/messages';
import { Posts } from './redux/features/posts/posts';

function App() {
	return (
		<>
			<h1>Redux Toolkit</h1>
			<Messages />
			<Posts />
		</>
	);
}

export default App;
