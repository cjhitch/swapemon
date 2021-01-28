import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({
	username,
	image,
	activeChat,
	userClickHandler,
	conversationId,
}) => {
	const [userId, setUserId] = useState('');
	useEffect(() => {
		const splStr = image.substr(0, image.indexOf('.'));
		setUserId(splStr);
	}, [image]);
	const userImage = require(`../../assets/images/${image}`);
	return (
		// using click event to add a class
		// eslint-disable-next-line
		<figure
			className={`User ${activeChat === userId ? 'chat-active' : ''}`}
			onClick={() => userClickHandler(userId, conversationId)}
		>
			<Image
				className="mr-2"
				roundedCircle="true"
				src={userImage.default}
			/>
			<p>@{username}</p>
		</figure>
	);
};

User.propTypes = {
	username: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	activeChat: PropTypes.string,
	userClickHandler: PropTypes.func,
	conversationId: PropTypes.string,
};

User.defaultProps = {
	activeChat: '',
	userClickHandler: null,
	conversationId: '',
};

export default User;
