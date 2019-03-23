import React, { Component } from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutUser } from '../actions/authActions'

class Header extends Component {
	handleLogout = e => {
		e.preventDefault()
		this.props.logoutUser()
	}
	render() {
		return (
			<header className={header}>
				<Link to='/' className={header__brand}>
					Vanhack Challenge
				</Link>
				<a className={header__item} onClick={this.handleLogout}>
					Logout
				</a>
			</header>
		)
	}
}

const header = css`
	align-items: center;
	background-color: #0e1a25;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	color: #ffffff;
	display: flex;
	font-family: var(--table-font);
	height: 70px;
	justify-content: space-between;
	padding: 0 4rem;
	width: 100vw;
`

const header__brand = css`
	opacity: 0;
	@media (min-width: 600px) {
		opacity: 1;
	}
`

const header__item = css`padding-left: 2rem;`

const mapStateToProps = state => ({
	auth : state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header)
