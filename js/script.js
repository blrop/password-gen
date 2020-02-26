const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 30;
const PASSWORD_ALPHABET_1 = 'abcdefghijklmnopqrstyvwxyz';
const PASSWORD_ALPHABET_2 = 'ABCDEFGHIJKMLNOPQRSTYVWXYZ';
const PASSWORD_ALPHABET_3 = '1234567890';
const PASSWORD_ALPHABET_4 = '!@#$%^&*()-=_+[]{};\':",./<>?\\|';

const PASSWORD_INFO_GENERATION = 'Click anywhere to copy';
const PASSWORD_INFO_COPIED = 'The password was copied. Click again to continue generation.';
const INIT_PASSWORD_VALUE = 'Move mouse to generate a password';

const getRandomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

const generatePassword = (complexityPercent, lengthPercent) => {
	const length = Math.round(lengthPercent / 100 * (PASSWORD_MAX_LENGTH - PASSWORD_MIN_LENGTH) + PASSWORD_MIN_LENGTH);

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

let app = new Vue({
	el: '#app',
	data: {
		generationInProgress: true,
		password: INIT_PASSWORD_VALUE,
		lengthList: [],
	},
	computed: {
		passwordInfo() {
			return this.generationInProgress ? PASSWORD_INFO_GENERATION : PASSWORD_INFO_COPIED;
		},
	},
	created() {
		let lengthList = [];
		for (let i = PASSWORD_MIN_LENGTH; i <= PASSWORD_MAX_LENGTH; i++) {
			lengthList.push(i);
		}
		this.lengthList = lengthList;
	},
	methods: {
		onMouseMove(e) {
			if (!this.generationInProgress) {
				return;
			}

			const complexityPercent = getPercent(e.clientY, e.view.innerHeight);
			const lengthPercent = getPercent(e.clientX, e.view.innerWidth);
			this.password = generatePassword(complexityPercent, lengthPercent);
		},
		onClick() {
			this.generationInProgress = !this.generationInProgress;

			if (!this.generationInProgress) {
				navigator.clipboard.writeText(this.password);
			}
		},
	}
});
