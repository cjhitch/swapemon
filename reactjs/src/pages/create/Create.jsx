import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import container from './container';
import FormControl from '../../components/formControl';
import Logo from '../../assets/images/logo.png';
import './Create.scss';

const Create = ({ ...props }) => {
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
	const save = (e) => {
		e.preventDefault();
		const {
			createUser,
			updateUser,
			match: {
				params: { id },
			},
		} = props;
		const { name, first, last, email, password } = user;
		if (id) {
			updateUser({ id, name, first, last, email, password });
		} else {
			createUser({ name, first, last, email, password });
		}
	};
	return (
		<section className="Create">
			<Image src={Logo} />
			<h1>Create Account</h1>
			<Form onSubmit={save}>
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
				{/* <Link to="/login"> */}
				<Button type="submit" variant="secondary">
					Submit
				</Button>
				{/* </Link> */}
			</Form>
			<p>
				<Link to="/forgot">Forgot Password?</Link> |{' '}
				<Link to="/login">Have an Account?</Link>
			</p>
		</section>
	);
};

export default withRouter(container(Create));
