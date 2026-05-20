import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getMd5 } from '../providers/md5Provider';
import Md5Form from './Md5Form';

jest.spyOn(window, 'fetch');

describe('<Md5Form />', () => {
	it('Entered phrase displayed', async () => {
		const { container } = render(<Md5Form getMd5={getMd5} />);
		const field = await screen.findByRole('textbox');
		userEvent.type(field, 'aaaa');
		const text = container.querySelector('.data-text');
		expect(text).toBeInTheDocument();
		expect(text).toHaveTextContent('aaaa');
	});

	it('Display fetched data', async () => {
		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: 'test' };
			},
		});
		const { container } = render(<Md5Form getMd5={getMd5} />);

		const button = await screen.findByRole('button');
		userEvent.click(button);

		await waitFor(() => {
			const text = container.querySelector('.data-md5');
			expect(text).toBeInTheDocument();
			expect(text).toHaveTextContent('test');
		});
	});

	it('Clear data-md5 when input changed', async () => {
		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: 'test' };
			},
		});
		const { container } = render(<Md5Form getMd5={getMd5} />);
		const field = await screen.findByRole('textbox');

		const button = await screen.findByRole('button');
		userEvent.click(button);

		await waitFor(() => {
			const text = container.querySelector('.data-md5');
			expect(text).toBeInTheDocument();
			expect(text).toHaveTextContent('test');
			userEvent.type(field, 'a');
			expect(text).toHaveTextContent('');
		});
	});
});
