import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/layout'
import Panel from '../components/panel'

import { getTasks } from '../actions/taskActions'

class Tasks extends Component {
	async componentDidMount() {
		await this.props.getTasks()

		document.title = 'Dashboard - Tasks'
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 2)
	}

	render() {
		const { tasks } = this.props
		return (
			<Layout>
				<h2>All Tasks</h2>
				{tasks && <Panel tasks={tasks} />}
			</Layout>
		)
	}
}

const mapStateToProps = state => {
	return { tasks: state.task.tasks }
}

export default connect(mapStateToProps, { getTasks })(Tasks)
