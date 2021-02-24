import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/auth/actions';
import User from '../user';
import './Header.scss';

const Header = () => {
	const logged = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	return (
		<header className="Header">
			<Navbar bg="primary" expand="lg" variant="dark">
				<Link className="navbar-brand" to="/profile">
					<User username="JamesEarlJones" image="jej.jpg" />
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto-sm ml-auto-md">
						{logged.loggedIn ? (
							<>
								<Link className="px-4 nav-link" to="/dashboard">
									Dashboard
								</Link>
								<Link
									className="px-4 my-4-sm nav-link"
									to="/profile"
								>
									Profile
								</Link>
								<Button
									onClick={(e) => {
										e.preventDefault();
										dispatch(logout);
										// this is a janky work around - i couldn't get state to fire
										window.location.reload(false);
									}}
								>
									Logout
								</Button>
							</>
						) : (
							<Button
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								Login
							</Button>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
