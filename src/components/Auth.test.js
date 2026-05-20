import { render, screen, waitFor } from '@testing-library/react';
import Auth from './Auth';
import userEvent from '@testing-library/user-event';

const DUMMY_USERS = [
	{
		login: 'jan@domena.pl',
		password: 'janeczek',
	},
	{
		login: 'marcin@domena.pl',
		password: 'janeczek',
	},
];

jest.mock('../db/users', () => DUMMY_USERS);
jest.spyOn(window, 'fetch');

describe('<Auth />', () => {
	it('Check authentication', async () => {
		fetch.mockImplementation((url, { method, body }) => {
			return Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						Digest: body,
					}),
			});
		});
		render(<Auth />);

		const loginField = await screen.findByLabelText(/login/i);
		const passField = await screen.findByLabelText(/password/i);
		const button = await screen.findByRole('button');

		userEvent.type(loginField, 'jan@domena.pl');
		userEvent.type(passField, 'janeczek');
		userEvent.click(button);

		const message = await screen.findByText(/Jesteś zalogowany jako:/i);
		expect(message).toBeInTheDocument();
	});
});
