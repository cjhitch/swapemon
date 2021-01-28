import React from 'react';
import User from '../user';
import './Messages.scss';

const Messages = () => {
	const conversations = [
		{
			id: 'a54aa11a-2597-41a4-965a-b96350261e24',
			userId: '806dd04e-dae0-4e07-bc29-3013a3cdc895',
			userName: 'DarthVader',
			msg: 'Hey do you have any dream balls to trade for?',
		},
		{
			id: 'b9d2c918-ad14-41fe-8877-5143bff92463',
			userId: '106a6442-df8f-4b97-b7fe-156e823283e4',
			userName: 'QuiGon',
			msg: 'Did you still have time to trade tonight?',
		},
		{
			id: '36d314e3-03c9-4e1c-9e48-45f71642b8c7',
			userId: 'af2cec25-1078-4b1b-8fd1-6dae365b5c51',
			userName: 'Fred',
			msg: 'Would you be willing to trade one of your Moon Bulbasaur?',
		},
	];
	return (
		<section className="Messages">
			<h1>Messages</h1>
			<div className="users">
				{conversations.map((convo) => (
					<User
						key={convo.id}
						username={convo.userName}
						image={`${convo.userId}.jpg`}
					/>
				))}
			</div>
		</section>
	);
};

export default Messages;
