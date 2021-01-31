import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Create from './pages/create';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Trades from './pages/trades';
import Form from './pages/form';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/dashboard">
							<>
								<Header />
								<Dashboard />
								<Footer />
							</>
						</Route>
						<Route path="/profile">
							<>
								<Header />
								<Profile />
								<Footer />
							</>
						</Route>
						<Route path="/trades">
							<>
								<Header />
								<Trades />
								<Footer />
							</>
						</Route>
						<Route path="/new">
							<>
								<Header />
								<Form />
								<Footer />
							</>
						</Route>
						<Route path="/edit/:id">
							<>
								<Header />
								<Form />
								<Footer />
							</>
						</Route>
						<Route path="/login" component={Login} />
						<Route path="/forgot" component={Forgot} />
						<Route path="/create" component={Create} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
