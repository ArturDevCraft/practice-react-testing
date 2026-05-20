export function isCardNumberValid(cardNumber) {
	let numStr = cardNumber.toString().replace(/[\s\-]/g, '');

	if (!/^\d+$/.test(numStr)) {
		return false;
	}

	while (numStr.length < 16) {
		numStr = '0' + numStr;
	}

	let sum = 0;
	const weights = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];

	for (let i = 0; i < 16; i++) {
		let product = parseInt(numStr[i], 10) * weights[i];

		if (product > 9) {
			sum += Math.floor(product / 10) + (product % 10);
		} else {
			sum += product;
		}
	}

	return sum % 10 === 0;
}

export function getCardOrganization(cardNumber) {
	let numStr = cardNumber.toString().replace(/[\s\-]/g, '');
	let length = numStr.length;

	if ((length === 16 || length === 13) && numStr.startsWith('4')) {
		return 'Visa';
	}

	if (length === 16 && /^5[1-5]/.test(numStr)) {
		return 'MasterCard';
	}

	if (length === 15 && /^3[47]/.test(numStr)) {
		return 'American Express';
	}

	if (length === 14 && /^3[068]/.test(numStr)) {
		return 'Diners Club / Carte Blanche';
	}

	if (length === 16) {
		let prefix4 = numStr.substring(0, 4);
		const jcbPrefixes = ['3088', '3096', '3112', '3158', '3337', '3528'];

		if (jcbPrefixes.includes(prefix4)) {
			return 'JCB';
		}
	}

	return 'Card provider is unknown';
}
