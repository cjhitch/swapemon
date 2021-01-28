import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({ username, image, isActive, userClickHandler }) => {
	const userImage = require(`../../assets/images/${image}`);
	return (
		// using click event to add a class
		// eslint-disable-next-line
		<figure
			className={`User ${isActive === image ? 'chat-active' : ''}`}
			onClick={() => userClickHandler(image)}
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
};

export default User;
