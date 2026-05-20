import { useState } from 'react';
import {
	getCardOrganization,
	isCardNumberValid,
} from '../providers/creditCardProvider';

const CreditCardChecker = () => {
	const [cardNo, setCardNo] = useState('');
	const [provider, setProvider] = useState('');
	const [isValid, setIsValid] = useState(null);

	function handleChange({ target }) {
		setCardNo(target.value);
		setProvider('');
		setIsValid(null);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const valid = isCardNumberValid(cardNo);
		const cardOrganization = getCardOrganization(cardNo);
		setProvider(cardOrganization);
		setIsValid(valid);
	}

	return (
		<section>
			<h2>Check Your credit card</h2>
			<form onSubmit={handleSubmit}>
				<p>
					<label>
						<input value={cardNo} onChange={handleChange} />
					</label>
				</p>
				<p>
					<button>send</button>
				</p>
			</form>
			<p>
				<span className="data-cardNumber">{cardNo}</span>
				<br />
				<span className="data-cardIsValid">
					{isValid !== null &&
						(isValid === true
							? 'Card number is correct'
							: 'Card number is invalid!')}
				</span>{' '}
				<strong className="data-cardProvider">{provider}</strong>
			</p>
		</section>
	);
};

export default CreditCardChecker;
