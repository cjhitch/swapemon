import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({ username, image }) => {
	// disabling eslint on next line - using .default to ensure it's not bringing in a module and using a dynamic import from the prop
	// also to allow require not at the top of the file. This image is dependent on the prop and cannot be at the top of the file
	// eslint-disable-next-line
	const userImage = require(`../../assets/images/${image}`);
	return (
		<figure className="User">
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
