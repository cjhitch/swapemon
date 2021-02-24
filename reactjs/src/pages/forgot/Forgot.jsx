import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import API from '../../API';
import './Forgot.scss';

const Forgot = () => {
	const [email, setEmail] = useState('');
	const update = (id, val) => {
		setEmail(val);
		return id;
	};
	const reset = (e) => {
		e.preventDefault();
		API.post('/auth/forgot_password', email);
	};
	return (
		<section className="Forgot">
			<Image src={Logo} />
			<h1>Forgot Your Password?</h1>
			<form onSubmit={reset}>
				<p>Enter email address to reset password</p>
				<FormControl
					placeholder="email@email.com"
					value={email}
					type="input"
					id="email"
					update={update}
				/>
				<Button type="submit" variant="secondary">
					Submit
				</Button>
			</form>
			<p>
				<Link to="/login">Ready to Login?</Link> |{' '}
				<Link to="/create">Create an Account?</Link>
			</p>
		</section>
	);
};

export default Forgot;
