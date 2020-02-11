document.addEventListener('DOMContentLoaded', () => {
	const $message = document.getElementById('message');
	const $currentPassword = document.getElementById('current-password');
	const $password = document.getElementById('password');
	const MESSAGE_SHOWN_CLASS = 'shown';
	const MESSAGE_SHOW_TIMEOUT = 3;
	const PASSWORD_MIN_LENGTH = 6;
	const PASSWORD_MAX_LENGTH = 30;
	const PASSWORD_ALPHABET_1 = 'abcdefghijklmnopqrstyvwxyz';
	const PASSWORD_ALPHABET_2 = 'ABCDEFGHIJKMLNOPQRSTYVWXYZ';
	const PASSWORD_ALPHABET_3 = '1234567890';
	const PASSWORD_ALPHABET_4 = '!@#$%^&*()-=_+[]{};\':",./<>?\\|';

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	const generatePassword = (complexityPercent, lengthPercent) => {
		const length = lengthPercent / 100 * (PASSWORD_MAX_LENGTH - PASSWORD_MIN_LENGTH) + PASSWORD_MIN_LENGTH;

		let alphabet = PASSWORD_ALPHABET_1;
		if (complexityPercent > 25) {
			alphabet += PASSWORD_ALPHABET_2;
		}
		if (complexityPercent > 50) {
			alphabet += PASSWORD_ALPHABET_3;
		}
		if (complexityPercent > 75) {
			alphabet += PASSWORD_ALPHABET_4;
		}

		let result = [];
		for (let i = 0; i < length; i++) {
			result.push(alphabet[getRandomInt(alphabet.length)]);
		}
		return result.join('');
	};

	const getPercent = (currentValue, max) => Math.round(currentValue / (max / 100));
	
	document.body.addEventListener('mousemove', (e) => {
		const complexityPercent = getPercent(e.clientY, e.view.innerHeight);
		const lengthPercent = getPercent(e.clientX, e.view.innerWidth);
		$password.textContent = generatePassword(complexityPercent, lengthPercent);
	});

	document.body.addEventListener('click', () => {
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
