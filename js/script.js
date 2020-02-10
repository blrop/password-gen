document.addEventListener('DOMContentLoaded', () => {
	const $message = document.getElementById('message');
	const $currentPassword = document.getElementById('current-password');
	const $password = document.getElementById('password');
	const MESSAGE_SHOWN_CLASS = 'shown';
	const MESSAGE_SHOW_TIMEOUT = 3;
	const PASSWORD_MIN_LENGTH = 8;
	const PASSWORD_MAX_LENGTH = 30;
	const PASSWORD_ALPHABET = '';

	const generatePassword = (complexity, length) => {
		return '!!!';
	};

	const getPercent = (currentValue, max) => Math.round(currentValue / (max / 100));
	
	document.body.addEventListener('mousemove', (e) => {
		const complexityPercent = getPercent(e.clientY, e.view.innerHeight);
		const lengthPercent = getPercent(e.clientX, e.view.innerWidth);
		const password = generatePassword(complexityPercent, lengthPercent);
		$password.textContent = password;
	});

	document.body.addEventListener('click', (e) => {
		const passwordToCopy = $password.textContent;

		navigator.clipboard.writeText(passwordToCopy)
			.then(() => {
				console.log('copied');

				$currentPassword.textContent = passwordToCopy;
				$message.classList.add(MESSAGE_SHOWN_CLASS);
				setTimeout(() => {
					$message.classList.remove(MESSAGE_SHOWN_CLASS);
				}, MESSAGE_SHOW_TIMEOUT);
			});
	});
});