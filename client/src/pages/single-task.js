import React, { Component } from 'react'
import SweetAlert from 'sweetalert-react'
import { css } from 'emotion'
import { connect } from 'react-redux'

import Button from '../common/Button'

import Layout from '../components/layout'

import { closeTask, getTask } from '../actions/taskActions'

const priorities = [
	{ _id: '1', name: 'High' },
	{ _id: '2', name: 'Normal' },
	{ _id: '3', name: 'Low' }
]

class SingleTask extends Component {
	state = {
		showAlert : false,
		taskOpen  : {}
	}
	async componentDidMount() {
		if (this.props.match.params.id) {
			const { id } = this.props.match.params
			await this.props.getTask(id)
		}
		document.title = 'Dashboard - Single Task'
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 2)
	}
	onSubmit = async e => {
		e.preventDefault()
		this.setState({ taskOpen: this.props.task._id, showAlert: true })
	}
	render() {
		const { task = undefined, user } = this.props
		const { showAlert, taskOpen } = this.state
		const prior = priorities.filter(p => p._id === task.priority)[0]
		return (
			<Layout>
				<h2>Task {task.title}</h2>
				{task.users && (
					<form className={task__form} onSubmit={this.onSubmit}>
						<p>
							<b>Task title:</b>
							<span className={task__title}>{task.title}</span>
						</p>
						<p>
							<b>Assigned for:</b> {task.users.name}
						</p>
						<p>
							<b>Priority:</b> {prior.name}
						</p>
						<p className={task__description}>{task.description}</p>
						{user === task.users._id && (
							<Button type='submit' text='Close' desc='confirm' />
						)}
					</form>
				)}
				<SweetAlert
					show={showAlert}
					title='Warning'
					text='Are you sure you want to close this task?'
					showCancelButton
					onConfirm={() => {
						this.props.closeTask(taskOpen, this.props.history)
						this.setState({ showAlert: false })
					}}
					onCancel={() => {
						this.setState({ showAlert: false })
					}}
					onClose={() => {
						this.setState({ showAlert: false })
					}}
				/>
			</Layout>
		)
	}
}

const task__form = css`
	box-shadow: 0px 3px 0.5rem rgba(0, 0, 0, .1);
	color: #333;
	margin-top: 10px;
	padding: 10px;
	& > p {
		padding: 5px 0;
	}
`

const task__title = css`
	color: #333;
	text-transform: uppercase;
`

const task__description = css`
	border: 1px solid #ddd;
	min-height: 250px;
	margin: 10px 0;
	padding: 10px 15px !important;
	width: 100%;
	&:focus {
		background-color: #f4f4f4;
	}
`

const mapStateToProps = state => {
	return { task: state.task.task, user: state.auth.user.id }
}

export default connect(mapStateToProps, { closeTask, getTask })(SingleTask)
