import React from 'react';
import LoginForm from './components/LoginForm';
import CatchError from './components/CatchError';

const Task01 = () => {
	function tryAuth(login, password) {
		return login.length + password.length > 6;
	}

	return (
		<CatchError message="Przesłane dane nie są poprawne!">
			<section>
				<h1>Task01</h1>
				<LoginForm tryAuth={tryAuth} />
			</section>
		</CatchError>
	);
};

export default Task01;
