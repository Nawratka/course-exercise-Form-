const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.close')

const showError = (input, msg) => {
	//argument input przechowuje nasze inputy
	//argument msg przechowuje placeholder

	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} składa się z min. ${min} znaków`
		);
	}
};

const checkPassword = (pass, pass2) => {
	if (pass2.value !== pass.value) {
		showError(pass2, 'Hasła się nie zgadzają');
	}
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};
 
const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	})
	console.log(errorCount);
	if(errorCount === 0) {
		popup.classList.add('show-popup')
	}
};

const closePopup = () => {
	popup.classList.remove('show-popup');
	[username, pass, pass2, email].forEach(el => {
		el.value = ''
	})
}

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([username, pass, pass2, email]);
	checkLength(username, 3);
	checkLength(pass, 6);
	checkPassword(pass, pass2);
	checkEmail(email);
	checkErrors();
});

clearBtn.addEventListener('click', (e) => {
	e.preventDefault();

	[username, pass, pass2, email].forEach((el) => {
		el.value = '';
		clearError(el);
	});
});

closePopupBtn.addEventListener('click', closePopup)
