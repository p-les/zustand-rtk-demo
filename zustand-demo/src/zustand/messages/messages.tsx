import { useState } from 'react';
import './messages.css';
import { useMessageStore } from './messages.store';
// import { useMessageStoreV2, addMessage, removeMessage } from './messages-v2.store';

export const Messages = () => {
	const [message, setMessage] = useState('');

	// const messages = useMessageStoreV2(state => state.messages);

	const messages = useMessageStore(state => state.messages);
	const addMessage = useMessageStore(state => state.addMessage);
	const removeMessage = useMessageStore(state => state.removeMessage);

	const addMessageHandler = () => {
		addMessage(message);
		setMessage('');
	};

	return (
		<div>
			<div className="card">
				<input
					placeholder="Enter Message"
					type="text"
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>
				<button onClick={addMessageHandler}>Add</button>
			</div>

			{messages.map(message => (
				<div className="message" key={message.id}>
					<span>{message.content}</span>
					<button onClick={() => removeMessage(message.id)}>delete</button>
				</div>
			))}
		</div>
	);
};
