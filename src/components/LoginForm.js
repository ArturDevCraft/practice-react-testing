import React, { useState } from 'react';

function LoginForm(props) {
	const userDefault = {
		login: {
			value: '',
			error: '',
		},
		password: {
			value: '',
			error: '',
		},
	};

	const [user, setUser] = useState(userDefault);
	const [error, setError] = useState(null);
	const [toThrow, setToThrow] = useState(null);
	if (toThrow) throw toThrow;

	function checkValue(value) {
		if (value.length <= 3) {
			throw new Error('The field is too short!');
		}
	}

	function handleChange(e) {
		const { name: field, value } = e.target;
		if (typeof user[field] !== 'undefined') {
			try {
				checkValue(value);
				setError(null);
			} catch (err) {
				setError(
					`Pole ${field}, jest za krótkie - wpowadź więcej niż 3 litery`,
				);
			}
			setUser({ ...user, [field]: { value, error: '' } });
		}
	}

	function throwError() {
		const err = new Error('Incorrect data!');
		setToThrow(err);
		// throw err;
	}

	function handleSubmit(e) {
		e.preventDefault();

		const { tryAuth } = props;
		const { login, password } = e.target.elements;

		const authResp = tryAuth(login.value, password.value);
		if (typeof authResp.then === 'function') {
			// if return Promise
			authResp.catch(() => throwError());
		} else if (!authResp) {
			throwError();
		}
	}

	const { login, password } = user;

	return (
		<form onSubmit={handleSubmit}>
			<p style={{ color: 'red' }}>{error}</p>
			<p>
				<label>
					login:{' '}
					<input
						name="login"
						value={login.value}
						onChange={(e) => handleChange(e)}
					/>
					{login.error && <strong>{login.error}</strong>}
				</label>
			</p>
			<p>
				<label>
					password:{' '}
					<input
						name="password"
						value={password.value}
						onChange={(e) => handleChange(e)}
					/>
					{password.error && <strong>{password.error}</strong>}
				</label>
			</p>
			<p>
				<button>send</button>
			</p>
		</form>
	);
}

export default LoginForm;
