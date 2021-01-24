import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({ username, image }) => {
	return (
		<figure className="User">
			<Image roundedCircle="true" src={image} />
			<p>@{username}</p>
		</figure>
	);
};

User.propTypes = {
	username: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
};

export default User;
