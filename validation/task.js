const Validator = require('validator')
const isEmpty = require('./check-string')

module.exports = function validateTaskInput(data) {
	let errors = {}

	data.title = !isEmpty(data.title) ? data.title : ''
	data.description = !isEmpty(data.description) ? data.description : ''

	if (Validator.isEmail(data.title)) {
		errors.title = 'Invalid title!'
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Invalid description!'
	}

	return {
		errors,
		validation : isEmpty(errors)
	}
}
