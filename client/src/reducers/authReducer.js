import {
	SET_CURRENT_USER,
	GET_USERS,
	EDIT_USER,
	REMOVE_USER
} from '../actions/types'

const initialState = {
	isAuthenticated : false,
	user            : {},
	users           : []
}

const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated : !isEmpty(action.payload),
				user            : action.payload
			}
		case GET_USERS:
			return {
				...state,
				users : action.payload
			}
		case EDIT_USER:
			return {
				...state,
				users : [ ...state.users ]
			}
		case REMOVE_USER:
			return {
				...state,
				users : state.users.filter(user => user._id !== action.payload)
			}
		default:
			return state
	}
}
