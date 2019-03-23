import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/token'
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_USERS,
	EDIT_USER,
	REMOVE_USER
} from './types'

// Register User
export const registerUser = (userData, history) => async dispatch => {
	try {
		await axios.post('/api/users/register', userData)
		history.push('/login')
	} catch (err) {
		dispatch({
			type    : GET_ERRORS,
			payload : err.response.data
		})
	}
}

// Login - Get User Token
export const loginUser = userData => async dispatch => {
	try {
		const result = await axios.post('/api/users/login', userData)
		const { token } = result.data

		localStorage.setItem('jwtToken', token)
		setAuthToken(token)

		const decoded = jwt_decode(token)
		dispatch(setCurrentUser(decoded))
	} catch (err) {
		dispatch({
			type    : GET_ERRORS,
			payload : err.response.data
		})
	}
}

// Get all users
export const getUsers = () => async dispatch => {
	try {
		const result = await axios.get('/api/users')
		const { data } = result
		dispatch({
			type    : GET_USERS,
			payload : data
		})
	} catch (err) {
		dispatch({
			type    : GET_ERRORS,
			payload : err.response.data
		})
	}
}

// Edit User
export const editUser = (id, userData) => async dispatch => {
	try {
		const res = await axios.patch(`/api/users/${id}`, userData)
		dispatch({
			type    : EDIT_USER,
			payload : res.data
		})
	} catch (err) {
		dispatch({
			type    : GET_ERRORS,
			payload : err.response.data
		})
	}
}

// Remove user
export const removeUser = id => async dispatch => {
	try {
		await axios.delete(`/api/users/${id}`)
		dispatch({
			type    : REMOVE_USER,
			payload : id
		})
	} catch (err) {
		dispatch({
			type    : GET_ERRORS,
			payload : err.response.data
		})
	}
}

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type    : SET_CURRENT_USER,
		payload : decoded
	}
}

// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken')
	// Remove auth header for future requests
	setAuthToken(false)
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}))
}
