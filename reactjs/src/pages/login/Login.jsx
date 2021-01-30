import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import './Login.scss';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const update = (id, val) => {
		if (id === 'password') {
			setPassword(val);
		} else {
			setUsername(val);
		}
	};
	return (
		<section className="Login">
			<Image src={Logo} />
			<h1>Login</h1>
			<form action="">
				<FormControl
					placeholder="username"
					value={username}
					type="input"
					id="username"
					update={update}
				/>
				<FormControl
					placeholder="password"
					value={password}
					type="input"
					id="password"
					update={update}
				/>
				<Link to="/dashboard">
					<Button variant="secondary">Submit</Button>
				</Link>
			</form>
			<p>
				<Link to="/forgot">Forgot Password?</Link> |{' '}
				<Link to="/create">Create an Account?</Link>
			</p>
		</section>
	);
};

export default Login;
