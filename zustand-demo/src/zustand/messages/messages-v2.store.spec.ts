import { setupStore } from '@zustand-test-utils';
import { act } from 'react-dom/test-utils';
import { addMessage, removeMessage, useMessageStoreV2 } from './messages-v2.store';

describe('messages store', () => {
	it('should return the initial state', () => {
		const { reset, result } = setupStore(useMessageStoreV2, {
			messages: [],
		});

		expect(result.current.messages).toEqual([]);
		reset();
	});

	it('should add a message', () => {
		const { reset, result } = setupStore(useMessageStoreV2);

		act(() => {
			addMessage('Hello World!');
		});

		expect(result.current.messages).toEqual([{ content: 'Hello World!', id: 1 }]);
		reset();
	});

	it('should remove a message', () => {
		const { reset, result } = setupStore(useMessageStoreV2, {
			messages: [{ content: 'Hello World!', id: 1 }],
		});

		act(() => {
			removeMessage(1);
		});

		expect(result.current.messages).toEqual([]);
		reset();
	});
});
