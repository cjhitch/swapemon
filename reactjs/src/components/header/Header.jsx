import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import User from '../user';
import './Header.scss';

const Header = () => {
	return (
		<header className="Header">
			<Navbar bg="primary" expand="lg" variant="dark">
				<Link className="navbar-brand" to="/profile">
					<User username="JamesEarlJones" image="jej.jpg" />
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto-sm ml-auto-md">
						<Link className="px-4 nav-link" to="/dashboard">
							Dashboard
						</Link>
						<Link className="px-4 my-4-sm nav-link" to="/profile">
							Profile
						</Link>
						<Link className="px-4 nav-link" to="/logout">
							Logout
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
