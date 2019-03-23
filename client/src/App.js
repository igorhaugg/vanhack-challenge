import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Loadable from 'react-loadable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import PrivateRoute from './utils/private-route'
import Spinner from './common/Spinner'
import store from './store/store'
import setAuthToken from './utils/token'
import { setCurrentUser, logoutUser } from './actions/authActions'

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken)
	const decoded = jwt_decode(localStorage.jwtToken)
	store.dispatch(setCurrentUser(decoded))

	const currentTime = Date.now() / 1000

	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser())
		if (window.location.href !== '/') {
			window.location.href = '/login'
		}
	}
}

// Loading component
const Loading = () => (
	<div className='full-centralize full-screen'>
		<Spinner />
	</div>
)

// Public components
const Login = Loadable({
	loader  : () => import('./pages/login'),
	loading : () => <Loading />
})

const Register = Loadable({
	loader  : () => import('./pages/register'),
	loading : () => <Loading />
})

const Dashboard = Loadable({
	loader  : () => import('./pages/dashboard'),
	loading : () => <Loading />
})

// Private Component
const Tasks = Loadable({
	loader  : () => import('./pages/tasks'),
	loading : () => <Loading />
})

const NewTask = Loadable({
	loader  : () => import('./pages/new-task'),
	loading : () => <Loading />
})

const SingleTask = Loadable({
	loader  : () => import('./pages/single-task'),
	loading : () => <Loading />
})

const ListUsers = Loadable({
	loader  : () => import('./pages/users'),
	loading : () => <Loading />
})

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path='/' component={Login} />
						<Route exact path='/register' component={Register} />
						<PrivateRoute exact path='/dashboard' component={Dashboard} />
						<PrivateRoute exact path='/dashboard/tasks' component={Tasks} />
						<PrivateRoute exact path='/dashboard/task' component={NewTask} />
						<PrivateRoute
							exact
							path='/dashboard/task/:id'
							component={SingleTask}
						/>
						<PrivateRoute exact path='/dashboard/users' component={ListUsers} />
						<Route path='*' component={Login} />
					</Switch>
				</Router>
			</Provider>
		)
	}
}

export default App
