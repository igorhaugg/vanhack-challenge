import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AuthForm from '../common/AuthForm'
import InputItem from '../common/InputItem'
import Button from '../common/Button'
import Spinner from '../common/Spinner'

import { registerUser } from '../actions/authActions'

export class Register extends Component {
	state = {
		name             : '',
		email            : '',
		password         : '',
		password2        : '',
		error            : {},
		passwordType     : 'password',
		passwordClicked  : false,
		password2Type    : 'password',
		password2Clicked : false,
		show             : false
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}

		if (nextProps.error) {
			this.setState({ error: nextProps.error })
		}
	}

	onSubmit = e => {
		e.preventDefault()

		this.setState({ show: true })

		const user = {
			name      : this.state.name,
			email     : this.state.email,
			password  : this.state.password,
			password2 : this.state.password2,
			admin     : false,
			active    : false
		}

		this.props.registerUser(user, this.props.history)
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleToggle = name => {
		if (name === 'password') {
			this.setState({
				passwordClicked : !this.state.passwordClicked,
				passwordType    :
					this.state.passwordType === 'password' ? 'text' : 'password'
			})
		} else {
			this.setState({
				password2Clicked : !this.state.password2Clicked,
				password2Type    :
					this.state.password2Type === 'password' ? 'text' : 'password'
			})
		}
	}

	render() {
		const { error } = this.state
		let divStyle = {
			display : 'flex'
		}
		return (
			<AuthForm titleText='Register' messageText='Já possui uma conta?'>
				<form onSubmit={this.onSubmit}>
					<InputItem
						label='name'
						name='name'
						value={this.state.name}
						onChange={this.onChange}
						error={error.name}
						required={true}
					/>
					<InputItem
						label='email'
						name='email'
						type='email'
						value={this.state.email}
						onChange={this.onChange}
						error={error.email}
						required={true}
					/>
					<InputItem
						label='password'
						name='password'
						type={this.state.passwordType}
						value={this.state.password}
						onChange={this.onChange}
						handleToggle={this.handleToggle}
						passwordClicked={this.state.passwordClicked}
						error={error.password}
						required={true}
					/>
					<InputItem
						label='confirmar password'
						name='password2'
						type={this.state.password2Type}
						value={this.state.password2}
						onChange={this.onChange}
						handleToggle={this.handleToggle}
						passwordClicked={this.state.password2Clicked}
						error={error.password2}
						required={true}
					/>
					{this.state.show && Object.keys(error).length === 0 && <Spinner />}
					<div style={divStyle}>
						<Button type='submit' text='Continue' desc='auth' />
					</div>
				</form>
			</AuthForm>
		)
	}
}

const mapStateToProps = state => ({
	auth  : state.auth,
	error : state.error
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
