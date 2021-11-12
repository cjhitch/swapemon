import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import API from '../../API';
import './Reset.scss';

const Reset = () => {
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
	const reset = async (e) => {
		e.preventDefault();
		if (newPassword !== '' && confirmPassword !== '') {
			// eslint-disable-next-line
			if (newPassword === confirmPassword) {
				try {
					const res = await API.post('/auth/reset_password', {
						password: newPassword,
					});
					// TODO: replace alert
					// eslint-disable-next-line no-alert
					alert(res.data);
					history.push('/login');
				} catch (error) {
					// TODO: replace alert
					// eslint-disable-next-line no-alert
					alert(error);
				}
			} else {
				// TODO: replace alert
				// eslint-disable-next-line no-alert
				alert('Passwords do not match!');
			}
		} else {
			// eslint-disable-next-line
			if (newPassword === '') {
				// TODO: replace alert
				// eslint-disable-next-line no-alert
				alert('new password cannot be left blank!');
			} else {
				// TODO: replace alert
				// eslint-disable-next-line no-alert
				alert('confirm password cannot be left blank!');
			}
		}
	};
	return (
		<section className="Reset">
			<Image src={Logo} />
			<h1>Reset</h1>
			<form onSubmit={reset}>
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
				<Button type="submit" variant="secondary">
					Submit
				</Button>
			</form>
			<p>
				<Link to="/forgot">Forgot Password?</Link> |{' '}
				<Link to="/create">Create an Account?</Link>
			</p>
		</section>
	);
};

export default Reset;
