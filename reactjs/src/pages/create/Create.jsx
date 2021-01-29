import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import './Create.scss';

const Create = () => {
	const [user, setUser] = useState({
		name: '',
		first: '',
		last: '',
		email: '',
		password: '',
		confirm: '',
	});
	const update = (id, val) => {
		setUser({ ...user, [id]: val });
	};
	return (
		<section className="Create">
			<Image src={Logo} />
			<h1>Create Account</h1>
			<form action="">
				<FormControl
					placeholder="username"
					value={user.name}
					type="input"
					id="name"
					update={update}
				/>
				<FormControl
					placeholder="first name"
					value={user.first}
					type="input"
					id="first"
					update={update}
				/>
				<FormControl
					placeholder="last name"
					value={user.last}
					type="input"
					id="last"
					update={update}
				/>
				<FormControl
					placeholder="email"
					value={user.email}
					type="input"
					id="email"
					update={update}
				/>
				<FormControl
					placeholder="password"
					value={user.password}
					type="input"
					id="password"
					update={update}
				/>
				<FormControl
					placeholder="confirm password"
					value={user.confirm}
					type="input"
					id="confirm"
					update={update}
				/>
				<Link to="/login">
					<Button variant="secondary">Submit</Button>
				</Link>
			</form>
			<p>
				<Link to="/forgot">Forgot Password?</Link> |{' '}
				<Link to="/login">Have an Account?</Link>
			</p>
		</section>
	);
};

export default Create;
