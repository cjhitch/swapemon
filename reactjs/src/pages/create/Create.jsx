import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import container from './container';
import FormControl from '../../components/formControl';
import { createUser } from '../../store/users/actions';
// import { createUser, updateUser } from '../../store/users/actions';
import Logo from '../../assets/images/logo.png';
import './Create.scss';

const Create = () => {
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();
	// eslint-disable-next-line
	const history = useHistory();
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
	const save = async (e) => {
		e.preventDefault();
		const { name, first, last, email, password } = user;
		console.log(users);
		dispatch(createUser(name, first, last, email, password)).catch(
			// TODO: replace alert
			// eslint-disable-next-line no-alert
			alert('This username or email already exists, please try again')
		);
		history.push('/login');
		// const {
		// 	createUser,
		// 	updateUser,
		// 	match: {
		// 		params: { id },
		// 	},
		// } = props;
		// if (id) {
		// 	updateUser({
		// 		id,
		// 		name,
		// 		first,
		// 		last,
		// 		email,
		// 		password,
		// 	}).then((err) => console.log(err));
		// 	// history.push('/login');
		// } else {
		// 	createUser({ name, first, last, email, password }).then((err) =>
		// 		console.log(err)
		// 	);
		// 	// history.push('/login');
		// }
		// console.log(props);
		// history.push('/login');
		// TODO: there needs to be error handling on this to ensure user was actually created
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
				<Button type="submit" variant="secondary">
					Submit
				</Button>
			</Form>
			<p>
				<Link to="/forgot">Forgot Password?</Link> |{' '}
				<Link to="/login">Have an Account?</Link>
			</p>
		</section>
	);
};

export default withRouter(container(Create));
