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
		</section>
	);
};

export default Home;
