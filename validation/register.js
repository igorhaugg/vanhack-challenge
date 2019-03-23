const Validator = require('validator')
const isEmpty = require('./check-string')

const validateRegister = data => {
	let errors = {}

	data.name = !isEmpty(data.name) ? data.name : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Insert a name with 2 and 30 chars.'
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name is mandatory.'
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email is mandatory.'
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email invalid.'
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is mandatory.'
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password with min 6 chars.'
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirmation is mandatory.'
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match.'
	}

	return {
		errors,
		validation : isEmpty(errors)
	}
}

module.exports = validateRegister
