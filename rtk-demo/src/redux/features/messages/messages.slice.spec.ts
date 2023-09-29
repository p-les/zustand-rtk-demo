import reducer, { MessagesState, addMessage, removeMessage } from './messages.slice';

describe('messages reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual({
			messages: [],
		});
	});

	test('should add a message to the list', () => {
		const previousState: MessagesState = {
			messages: [],
		};

		expect(reducer(previousState, addMessage('Hello'))).toEqual({
			messages: [{ content: 'Hello', id: 1 }],
		});
	});

	test('should remove the message from the list', () => {
		const previousState: MessagesState = {
			messages: [{ content: 'Hello', id: 1 }],
		};

		expect(reducer(previousState, removeMessage(1))).toEqual({
			messages: [],
		});
	});
});
