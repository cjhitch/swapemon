/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { verifyUser } from '../../store/auth/actions';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import './Reset.scss';

const Reset = () => {
	const logged = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const update = (id, val) => {
		if (id === 'confirmPassword') {
			setConfirmPassword(val);
		} else {
			setNewPassword(val);
		}
	};
	// useEffect(() => {
	// 	if (logged.loggedIn) {
	// 		history.push('/dashboard');
	// 	}
	// }, [logged]);
	const login = (e) => {
		e.preventDefault();
		dispatch(verifyUser(newPassword, confirmPassword));
	};
	return (
		<section className="Reset">
			<Image src={Logo} />
			<h1>Reset</h1>
			<form onSubmit={login}>
				<FormControl
					placeholder="new password"
					value={newPassword}
					type="input"
					id="username"
					update={update}
				/>
				<FormControl
					placeholder="confirm password"
					value={confirmPassword}
					type="input"
					id="confirmPassword"
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

export default Reset;
