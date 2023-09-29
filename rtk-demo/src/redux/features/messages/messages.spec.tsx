import { screen } from '@testing-library/react';
import { Messages } from './messages';
import { renderWithProviders } from '@redux-test-utils';
import { addMessage } from './messages.slice';
import { setupStore } from '@/redux/store';
import userEvent from '@testing-library/user-event';

describe('Messages', () => {
	it('Should render succesfully', () => {
		renderWithProviders(<Messages />, {
			preloadedState: {
				messages: {
					messages: [{ id: 1, content: 'Hello' }],
				},
			},
		});

		expect(screen.getByPlaceholderText('Enter Message')).toBeInTheDocument();
		expect(screen.getByText('Add')).toBeInTheDocument();
		expect(screen.getByText('Hello')).toBeInTheDocument();
	});

	it('Should setup initial state with action', () => {
		const store = setupStore();
		store.dispatch(addMessage('Hi'));

		renderWithProviders(<Messages />, { store });

		expect(screen.getByText('Hi')).toBeInTheDocument();
	});

	it('Should add message', async () => {
		renderWithProviders(<Messages />);

		const input = screen.getByPlaceholderText('Enter Message');
		const button = screen.getByText('Add');

		await userEvent.type(input, 'Hello');
		await userEvent.click(button);

		expect(screen.getByText('Hello')).toBeInTheDocument();
	});

	it('Should remove message', async () => {
		renderWithProviders(<Messages />, {
			preloadedState: {
				messages: {
					messages: [{ id: 1, content: 'Hello' }],
				},
			},
		});

		const button = screen.getByText('delete');

		await userEvent.click(button);

		expect(screen.queryByText('Hello')).not.toBeInTheDocument();
	});
});
