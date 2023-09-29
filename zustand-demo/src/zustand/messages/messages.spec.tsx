import { render, screen } from '@testing-library/react';
import { Messages } from './messages';
import { setupStore } from '@zustand-test-utils';
import { MessagesState, useMessageStore } from './messages.store';
import userEvent from '@testing-library/user-event';

describe('Messages', () => {
	it('Should render succesfuly', () => {
		const { reset } = setupStore<MessagesState>(useMessageStore, {
			messages: [{ id: 1, content: 'Hello' }],
		});

		render(<Messages />);

		expect(screen.getByPlaceholderText('Enter Message')).toBeInTheDocument();
		expect(screen.getByText('Add')).toBeInTheDocument();
		expect(screen.getByText('Hello')).toBeInTheDocument();
		reset();
	});

	it('Should add a message', async () => {
		const { reset } = setupStore<MessagesState>(useMessageStore);

		render(<Messages />);

		const input = screen.getByPlaceholderText('Enter Message');
		const button = screen.getByText('Add');

		await userEvent.type(input, 'Hi');
		await userEvent.click(button);

		expect(screen.getByText('Hi')).toBeInTheDocument();

		reset();
	});

	it('Should remove message', async () => {
		const { reset } = setupStore<MessagesState>(useMessageStore, {
			messages: [{ id: 1, content: 'Hello' }],
		});

		render(<Messages />);

		const button = screen.getByText('delete');

		await userEvent.click(button);

		expect(screen.queryByText('Hello')).not.toBeInTheDocument();
		reset();
	});
});
