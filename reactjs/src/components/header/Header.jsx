import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.scss';

const Header = () => {
	return (
		<header className="Header">
			<Navbar bg="primary" expand="lg" variant="dark">
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link className="px-4" href="#home">
							Dashboard
						</Nav.Link>
						<Nav.Link className="px-4" href="#link">
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
