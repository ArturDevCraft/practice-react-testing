import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('<LoginForm>', () => {
	it('Render form fields', async () => {
		const mockFn = jest.fn();

		render(<LoginForm tryAuth={mockFn} />);

		const loginField = await screen.findByLabelText(/login/i);
		const passField = await screen.findByLabelText(/password/i);
		expect(loginField).toBeInTheDocument();
		expect(passField).toBeInTheDocument();
	});

	it('Show error if fields are shorter than 4 characters', async () => {
		const mockFn = jest.fn();

		mockFn.mockReturnValue(true);

		render(<LoginForm tryAuth={mockFn} />);
		const loginField = await screen.findByLabelText(/login/i);
		const passField = await screen.findByLabelText(/password/i);

		userEvent.type(loginField, 'aa');

		let errorMessage = await screen.findByText(/wprowadź więcej niż 3 litery/i);
		expect(errorMessage).toBeInTheDocument();

		userEvent.type(passField, 'aa');
		errorMessage = await screen.findByText(/wprowadź więcej niż 3 litery/i);
		expect(errorMessage).toBeInTheDocument();
		await waitFor(() => {});
	});

	it('Send form', async () => {
		const mockFn = jest.fn();

		mockFn.mockReturnValue(true);

		render(<LoginForm tryAuth={mockFn} />);
		const loginField = await screen.findByLabelText(/login/i);
		const passField = await screen.findByLabelText(/password/i);
		const button = await screen.findByRole('button');

		userEvent.type(loginField, 'aaaa');
		userEvent.type(passField, 'bbbb');
		userEvent.click(button);

		await waitFor(() => {
			expect(mockFn).toHaveBeenCalledWith('aaaa', 'bbbb');
		});
	});
});
