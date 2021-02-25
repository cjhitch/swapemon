import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from './components/authRoute';
import Home from './pages/home';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Create from './pages/create';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Trades from './pages/trades';
import Reset from './pages/reset';
import Form from './pages/form';

import './App.scss';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<AuthRoute path="/dashboard">
						<Dashboard />
					</AuthRoute>
					<AuthRoute path="/profile">
						<Profile />
					</AuthRoute>
					<AuthRoute path="/trades">
						<Trades />
					</AuthRoute>
					<AuthRoute path="/new">
						<Form />
					</AuthRoute>
					<AuthRoute path="/edit/:id">
						<Form />
					</AuthRoute>
					<Route path="/login" component={Login} />
					<Route path="/forgot" component={Forgot} />
					<Route path="/reset" component={Reset} />
					<Route path="/create" component={Create} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
