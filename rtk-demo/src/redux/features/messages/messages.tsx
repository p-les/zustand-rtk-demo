import { useState } from 'react';
import './messages.css';
import { addMessage, removeMessage } from './messages.slice';
import { useAppSelector, useAppDispatch } from '@store';

export const Messages = () => {
	const [message, setMessage] = useState('');

	const { messages } = useAppSelector(({ messages }) => messages);

	const dispatch = useAppDispatch();

	const addMessageHandler = () => {
		dispatch(addMessage(message));
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
					<button onClick={() => dispatch(removeMessage(message.id))}>delete</button>
				</div>
			))}
		</div>
	);
};
