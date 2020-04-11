const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 30;
const ALPHABET = ['abcdefghijklmnopqrstyvwxyz', 'ABCDEFGHIJKMLNOPQRSTYVWXYZ', '1234567890', '!@#$%^&*()-=_+[]{};\':",./<>?\\|'];

const PASSWORD_INFO_GENERATION = 'Click anywhere to copy';
const PASSWORD_INFO_COPIED = 'The password was copied. Click again to continue generation.';
const INIT_PASSWORD_VALUE = 'Move mouse to generate a password';

const getRandomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

const generatePassword = (complexityIndex, passwordLength) => {
	let result = [];
	for (let i = 0; i < passwordLength; i++) {
		const alphabetIndex = getRandomInt(complexityIndex + 1);
		const alphabet = ALPHABET[alphabetIndex];
		result.push(alphabet[getRandomInt(alphabet.length)]);
	}
	return result.join('');
};

const getPercent = (currentValue, max) => Math.round(currentValue / (max / 100));

const complexityPercentToIndex = (complexityPercent) => {
    let result = Math.floor(complexityPercent / 25);
    if (result > 3) {
        result = 3;
    }
    return result;
};

const lengthPercentToLength = (lengthPercent) => {
    return Math.round(lengthPercent / 100 * (PASSWORD_MAX_LENGTH - PASSWORD_MIN_LENGTH) + PASSWORD_MIN_LENGTH);
};

let app = new Vue({
	el: '#app',
	data: {
		generationInProgress: true,
		password: INIT_PASSWORD_VALUE,
		lengthList: [],
        complexityIndex: 0,
        passwordLength: 0,
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

			this.complexityIndex = complexityPercentToIndex(getPercent(e.clientY, e.view.innerHeight));
			this.passwordLength = lengthPercentToLength(getPercent(e.clientX, e.view.innerWidth));
			this.password = generatePassword(this.complexityIndex, this.passwordLength);
		},
		onClick() {
			this.generationInProgress = !this.generationInProgress;

			if (!this.generationInProgress) {
				navigator.clipboard.writeText(this.password);
			}
		},
	}
});
