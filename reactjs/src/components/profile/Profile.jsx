import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'react-bootstrap/Button';
import User from '../user';
import FormControl from '../formControl';
import container from './container';
import './Profile.scss';
import { fetchUser } from '../../store/users/actions';

const Profile = () => {
	const initialState = {
		gameName: '',
		gameCode: '',
		email: '',
		curPw: '',
		newPw: '',
		conPw: '',
	};
	const [formState, setFormState] = useState(initialState);
	const [user, setUser] = useState();
	const storeData = useSelector((state) => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		// TODO: this needs a better way to find user
		dispatch(fetchUser('790fe8b3-3ce3-444a-99c2-6eca0d28c65a'));
		// this is intentionally left as empty array to run once on load like a componentDidMount()
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		console.log(storeData);
		if (storeData.allIds.length > 0) {
			setUser(
				storeData.byId['790fe8b3-3ce3-444a-99c2-6eca0d28c65a'].data
			);
		}
	}, [setUser, storeData]);

	const update = (inputId, value) => {
		setFormState({ ...formState, [inputId]: value });
	};
	const updateEmail = () => {
		const newEmail = formState.email;
		setUser({ ...user, email: newEmail });
	};
	const addGame = () => {
		const newArr = user.games;
		const newGame = { id: formState.gameCode, name: formState.gameName };
		newArr.push(newGame);
		setUser({ ...user, games: newArr });
	};
	const updatePassword = () => {
		// TODO: this should actually be replaced with the db value from the store
		if (formState.curPw === 'pass123') {
			if (formState.newPw === formState.conPw) {
				// set the password here once db is set up
				alert('password changed!');
			} else {
				alert('passwords do not match');
			}
		} else {
			alert("current password doesn't match");
		}
	};

	return (
		<section className="Profile">
			<h1>Profile</h1>
			<p>View and update account settings</p>
			{user === '' || user === undefined ? (
				<h1>...Loading</h1>
			) : (
				<>
					<User username={user.username} image={`${user.id}.jpg`} />
					<p>
						<b>
							{user.system.name} - {user.system.id}
						</b>
					</p>
					<h2>Games</h2>
					{user.games.map((game) => (
						<p key={game.id}>
							{game.name} - {game.id}
						</p>
					))}
					<form id="addGame" action="">
						<h2>Add Game</h2>
						<FormControl
							value={formState.gameName}
							type="input"
							id="gameName"
							update={update}
							placeholder="name"
						/>
						<FormControl
							value={formState.code}
							type="input"
							id="gameCode"
							update={update}
							placeholder="code"
						/>
						<Button onClick={addGame} variant="primary-light">
							add game
						</Button>
					</form>
					<form id="updateEmail" action="">
						<p>Update Email</p>
						<FormControl
							value={formState.email}
							type="input"
							id="email"
							update={update}
							placeholder="email@email.com"
						/>
						<Button
							// eslint-disable-next-line
							onClick={updateEmail}
							variant="primary-light"
						>
							update email
						</Button>
					</form>
					<form id="updatePassword" action="">
						<p>Change Password</p>
						<FormControl
							value={formState.curPw}
							type="input"
							id="curPw"
							update={update}
							placeholder="current password"
						/>
						<FormControl
							value={formState.newPw}
							type="input"
							id="newPw"
							update={update}
							placeholder="new password"
						/>
						<FormControl
							value={formState.conPw}
							type="input"
							id="conPw"
							update={update}
							placeholder="confirm password"
						/>
						<Button
							onClick={updatePassword}
							variant="primary-light"
						>
							change password
						</Button>
					</form>
				</>
			)}
		</section>
	);
};

export default withRouter(container(Profile));
