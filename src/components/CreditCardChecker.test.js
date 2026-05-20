import { render, screen } from '@testing-library/react';
import CreditCardChecker from './CreditCardChecker';
import userEvent from '@testing-library/user-event';

const CARD_NUMBERS = {
	Visa: '4242 4242 4242 4242',
	MasterCard: '5555 5555 5555 4444',
	'American Express': '3782 822463 10005',
	'Diners Club / Carte Blanche': '3601 2345 6789 01',
	JCB: '3528 0000 0000 0007',
	failure: '232143124',
};

describe('CreditCardChecker', () => {
	it('Recognize cards provider', async () => {
		render(<CreditCardChecker />);
		const cardNumberField = await screen.findByRole('textbox');
		const button = await screen.findByRole('button');

		for (const [key, value] of Object.entries(CARD_NUMBERS)) {
			userEvent.type(cardNumberField, `{selectall}${value}`);
			userEvent.click(button);

			const message = await screen.findByText(
				new RegExp(key === 'failure' ? 'Card provider is unknown' : key, 'i'),
			);
			expect(message).toBeInTheDocument();
		}
	});

	it('Check the correct card number', async () => {
		render(<CreditCardChecker />);
		const cardNumberField = await screen.findByRole('textbox');
		const button = await screen.findByRole('button');

		for (const [key, value] of Object.entries(CARD_NUMBERS)) {
			userEvent.type(cardNumberField, `{selectall}${value}`);
			userEvent.click(button);

			const message = await screen.findByText(
				new RegExp(key === 'failure' ? 'Card number is invalid' : key, 'i'),
			);
			expect(message).toBeInTheDocument();
		}
	});
});
