import React from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';

const Chat = ({ conversationId }) => {
	return (
		<div className="Chat">
			<h1>{conversationId}</h1>
		</div>
	);
};

Chat.propTypes = {
	conversationId: PropTypes.string,
};

Chat.defaultProps = {
	conversationId: '',
};

export default Chat;
