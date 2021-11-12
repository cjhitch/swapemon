import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './Home.scss';

const Home = () => {
	return (
		<section className="Home">
			<Image src={Logo} />
			<h1>Track & Manage Pokémon Like A Pro</h1>
			<Link to="/login">
				<Button variant="secondary">Login</Button>
			</Link>
			<Link to="/create">
				<Button variant="tertiary">Create an Account</Button>
			</Link>
			<h2 className="text-center mt-5 h3">
				Learn more{' '}
				<Link className="nav-link d-inline" to="/about">
					About
				</Link>{' '}
				Us
			</h2>
		</section>
	);
};

export default Home;
