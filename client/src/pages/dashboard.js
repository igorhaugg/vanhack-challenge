import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/layout'
import Panel from '../components/panel'

import { getTasksSingleUser } from '../actions/taskActions'

class Dashboard extends Component {
	async componentDidMount() {
		await this.props.getTasksSingleUser(this.props.user.id)
		document.title = 'Dashboard'
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 2)
	}

	render() {
		const { tasks } = this.props
		return (
			<Layout>
				<h2>System Dashboard</h2>
				{tasks && <Panel tasks={tasks} assigned={'Assigned to me'} />}
			</Layout>
		)
	}
}

const mapStateToProps = state => {
	return { tasks: state.task.tasks, user: state.auth.user }
}

export default connect(mapStateToProps, { getTasksSingleUser })(Dashboard)
