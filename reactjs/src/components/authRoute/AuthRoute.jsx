import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import AuthRouteContainer from './container';

const AuthRoute = ({ loggedIn, ...props }) => {
	if (loggedIn) {
		return (
			<>
				<Header />
				{props.children}
				<Footer />
			</>
		);
	}
	return <Redirect to="/login" />;
};

export default AuthRouteContainer(AuthRoute);
