import React, { Fragment } from 'react'
import { css } from 'emotion'

import Header from './header'
import Sidebar from './sidebar'
import SlideMenu from './slide-menu'

const Layout = props => {
	return (
		<Fragment>
			<div id='outer-container '>
				<SlideMenu
					pageWrapId={'page-wrap'}
					outerContainerId={'outer-container'}
				/>
				<div className={layout} id='page-wrap'>
					<Header title={props.title} />
					<main className={layout__main}>
						<Sidebar />
						<section className={layout__section}>{props.children}</section>
					</main>
				</div>
			</div>
		</Fragment>
	)
}

const layout = css`
	display: flex;
	flex-direction: column;
`

const layout__main = css`
	display: flex;
	width: 100%;
`

const layout__section = css`
	color: #4a4aff;
	padding: 20px 10px;
	width: 100%;
	@media (min-width: 600px) {
		padding: 20px 50px;
	}
`

export default Layout
