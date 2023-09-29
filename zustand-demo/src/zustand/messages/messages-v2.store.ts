import { Draft } from 'immer';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
	id: number;
	content: string;
}

export interface MessagesStateV2 {
	messages: Message[];
}

const withMiddleware = (
	f: StateCreator<
		MessagesStateV2,
		[['zustand/immer', never], ['zustand/persist', unknown], ['zustand/devtools', never]]
	>
) =>
	immer(
		persist(devtools(f, { name: 'messages-store-v2' }), {
			name: 'messages-storage',
			storage: createJSONStorage(() => sessionStorage),
		})
	);

export const useMessageStoreV2 = create<MessagesStateV2>()(
	withMiddleware(_ => ({
		messages: [],
	}))
);

export const addMessage = (message: string) =>
	useMessageStoreV2.setState((state: Draft<MessagesStateV2>) => {
		state.messages.push({ content: message, id: state.messages.length + 1 });
	});

export const removeMessage = (id: number) =>
	useMessageStoreV2.setState((state: Draft<MessagesStateV2>) => {
		state.messages = state.messages.filter(message => message.id !== id);
	});
