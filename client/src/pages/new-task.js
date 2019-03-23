import React, { Component } from 'react'
// import SweetAlert from 'sweetalert-react'
import { connect } from 'react-redux'

import InputItem from '../common/InputItem'
import SelectItem from '../common/SelectItem'
import Button from '../common/Button'

import Layout from '../components/layout'

import { getUsers } from '../actions/authActions'
import { addTask } from '../actions/taskActions'

const priorities = [
	{ _id: '1', name: 'High' },
	{ _id: '2', name: 'Normal' },
	{ _id: '3', name: 'Low' }
]

class Dashboard extends Component {
	state = {
		title       : '',
		user        : '',
		description : '',
		priority    : '3',
		errors      : {}
	}
	async componentDidMount() {
		await this.props.getUsers()
		document.title = 'Dashboard'
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 2)
	}
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = async e => {
		e.preventDefault()
		const { title, user, priority, description } = this.state
		const task = {
			title,
			user,
			priority,
			description
		}
		this.props.addTask(task, this.props.history)
	}
	render() {
		const { title, user, priority, description, errors } = this.state
		const { users } = this.props
		return (
			<Layout>
				<h2>New Task</h2>
				<form onSubmit={this.onSubmit}>
					<InputItem
						label='Title'
						name='title'
						value={title}
						onChange={this.onChange}
						error={errors.title}
					/>
					<InputItem
						label='Description'
						name='description'
						value={description}
						onChange={this.onChange}
						error={errors.description}
					/>
					{users && (
						<SelectItem
							label='User'
							name='user'
							value={user}
							onChange={this.onChange}
							error={errors.user}
							items={users}
						/>
					)}
					<SelectItem
						label='Priority'
						name='priority'
						value={priority}
						onChange={this.onChange}
						error={errors.priority}
						items={priorities}
						message='Select'
					/>
					<Button type='submit' text='Submit' desc='confirm' />
				</form>
			</Layout>
		)
	}
}

const mapStateToProps = state => {
	return { users: state.auth.users }
}

export default connect(mapStateToProps, { getUsers, addTask })(Dashboard)
