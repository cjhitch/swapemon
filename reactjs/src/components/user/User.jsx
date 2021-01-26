import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({ username, image }) => {
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
