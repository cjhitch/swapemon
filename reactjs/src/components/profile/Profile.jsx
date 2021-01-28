import React from 'react';
import User from '../user';
import './Profile.scss';

const Profile = () => {
	// this will be brought in from the store
	const user = {
		id: '790fe8b3-3ce3-444a-99c2-6eca0d28c65a',
		username: 'JamesEarlJones',
		sytem: {
			id: 'b77e74b6-e1d9-4a6a-9962-98f16aad65b7',
			name: 'Switch',
		},
		games: [
			{
				id: '4c33d112-00b3-4ac7-935f-76e7e6a24a94',
				name: 'Sword',
			},
			{
				id: '4a9877e3-f4f2-48f0-9e98-e80c4c8823df',
				name: 'Shield',
			},
		],
		pokemon: [
			'c8b666af-336c-453d-be73-e700edeb3a84',
			'21c05d07-2e1e-46d6-b93b-290906b9cd2e',
			'c2d847cb-24ac-4f47-8e05-d9ba632c3980',
		],
		consversations: [
			{
				id: 'a54aa11a-2597-41a4-965a-b96350261e24',
				userId: '806dd04e-dae0-4e07-bc29-3013a3cdc895',
				msg: 'Hey do you have any dream balls to trade for?',
			},
			{
				id: 'b9d2c918-ad14-41fe-8877-5143bff92463',
				userId: '106a6442-df8f-4b97-b7fe-156e823283e4',
				msg: 'Did you still have time to trade tonight?',
			},
			{
				id: '36d314e3-03c9-4e1c-9e48-45f71642b8c7',
				userId: 'af2cec25-1078-4b1b-8fd1-6dae365b5c51',
				msg:
					'Would you be willing to trade one of your Moon Bulbasaur?',
			},
		],
	};

	return (
		<section className="Profile">
			<h1>Profile</h1>
			<p>View and update account settings</p>
			<User username={user.username} image={`${user.id}.jpg`} />
		</section>
	);
};

export default Profile;
