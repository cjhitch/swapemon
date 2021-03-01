import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Chat.scss';

const Chat = ({ chat }) => {
	console.log(chat);
	const id = useSelector((state) => state.auth.id);
	return (
		<div className="Chat">
			{chat[0].id !== '' &&
				chat.map((msg) => (
					<p key={msg.id} className={msg.from === id ? 'user' : ''}>
						{msg.message}
					</p>
				))}
		</div>
	);
};

Chat.propTypes = {
	chat: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			from: PropTypes.string,
			message: PropTypes.string,
		})
	).isRequired,
};

export default Chat;
