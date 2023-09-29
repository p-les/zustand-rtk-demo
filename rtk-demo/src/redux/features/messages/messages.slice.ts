import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Message {
	id: number;
	content: string;
}

export interface MessagesState {
	messages: Message[];
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState: <MessagesState>{
		messages: [],
	},
	reducers: {
		addMessage(state, action: PayloadAction<string>) {
			state.messages.push({ content: action.payload, id: state.messages.length + 1 });
		},
		removeMessage(state, action: PayloadAction<number>) {
			state.messages = state.messages.filter(message => message.id !== action.payload);
		},
	},
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
