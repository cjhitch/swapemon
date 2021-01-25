import React from 'react';
import Image from 'react-bootstrap/Image';
import BallLogo from '../../assets/images/logo.png';
import './Logo.scss';

const Logo = ({ variant }) => {
	return (
		<Image
			className={`Logo ${variant === 'footer' && 'footer'}`}
			src={BallLogo}
		/>
	);
};

export default Logo;
