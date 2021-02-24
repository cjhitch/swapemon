import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { verifyUser } from '../../store/auth/actions';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import './Login.scss';

const Login = () => {
	const logged = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const update = (id, val) => {
		if (id === 'password') {
			setPassword(val);
		} else {
			setUsername(val);
		}
	};
	useEffect(() => {
		if (logged.loggedIn) {
			history.push('/dashboard');
		}
	}, [logged]);
	const login = (e) => {
		e.preventDefault();
		dispatch(verifyUser(username, password));
	};
	return (
		<section className="Login">
			<Image src={Logo} />
			<h1>Login</h1>
			<form onSubmit={login}>
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
				{/* <Link to="/dashboard"> */}
				<Button type="submit" variant="secondary">
					Submit
				</Button>
				{/* </Link> */}
			</form>
			<p>
				<Link to="/forgot">Forgot Password?</Link> |{' '}
				<Link to="/create">Create an Account?</Link>
			</p>
		</section>
	);
};

export default Login;
