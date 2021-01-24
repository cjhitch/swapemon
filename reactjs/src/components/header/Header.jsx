import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import User from '../user';
import './Header.scss';

const Header = () => {
	return (
		<header className="Header">
			<Navbar bg="primary" expand="lg" variant="dark">
				<Navbar.Brand href="#profile">
					<User
						username="JamesEarlJones"
						// eslint-disable-next-line
						image="jej.jpg"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto-sm ml-auto-md">
						<Nav.Link className="px-4" href="#home">
							Dashboard
						</Nav.Link>
						<Nav.Link className="px-4 my-4-sm" href="#link">
							Profile
						</Nav.Link>
						<Nav.Link className="px-4" href="#link">
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
