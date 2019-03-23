import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { css } from 'emotion'
import { connect } from 'react-redux'
import { pushRotate as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'

import './slide-menu.css'

class SlideMenu extends Component {
	render() {
		const { admin } = this.props.auth.user
		return (
			<Menu menuClassName={'slide-menu'}>
				{admin && (
					<NavLink
						to='/dashboard'
						exact
						activeClassName={sidebar__active}
						className={sidebar__item}>
						<i className={`fas fa-home ${sidebar__icon}`} />
						<span>Home</span>
					</NavLink>
				)}
				<NavLink
					to='/dashboard/tasks'
					activeClassName={sidebar__active}
					className={sidebar__item}>
					<i className={`fas fa-project-diagram ${sidebar__icon}`} />
					<span>All Tasks</span>
				</NavLink>
				{admin && (
					<NavLink
						to='/dashboard/task'
						activeClassName={sidebar__active}
						className={sidebar__item}>
						<i className={`fas fa-tasks ${sidebar__icon}`} />
						<span>Add Task</span>
					</NavLink>
				)}
				{admin && (
					<NavLink
						to='/dashboard/users'
						activeClassName={sidebar__active}
						className={sidebar__item}>
						<i className={`fas fa-user ${sidebar__icon}`} />
						<span>Users</span>
					</NavLink>
				)}
			</Menu>
		)
	}
}

const sidebar__active = css`background: rgba(255, 255, 255, 0.23);`

const sidebar__icon = css`
	height: 1.5rem;
	margin-right: 1rem;
`

const sidebar__item = css`
	border-radius: 5px;
	color: white;
	font-family: var(--table-font);
	font-size: 1.2rem;
	font-weight: 600;
	margin: 0.5rem;
	padding: 1.5rem 0 1.5rem 2rem;
	text-transform: uppercase;
	transition: background 0.15s ease-in-out;
	width: 85%;
	> li {
		display: flex;
	}
	&:hover {
		background: rgba(255, 255, 255, 0.23);
	}
`

SlideMenu.propTypes = {
	auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth : state.auth
})

export default connect(mapStateToProps)(SlideMenu)
