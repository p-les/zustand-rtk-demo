import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Message {
	id: number;
	content: string;
}

export interface MessagesState {
	messages: Message[];
	addMessage: (message: string) => void;
	removeMessage: (id: number) => void;
}

export const useMessageStore = create<MessagesState>()(
	devtools(
		set => ({
			messages: [],
			addMessage: message =>
				set(state => ({
					messages: [
						...state.messages,
						{ content: message, id: state.messages.length + 1 },
					],
				})),
			removeMessage: id =>
				set(state => ({
					messages: state.messages.filter(message => message.id !== id),
				})),
		}),
		{
			name: 'messages-store',
		}
	)
);
