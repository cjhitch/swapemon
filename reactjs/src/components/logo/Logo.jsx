import React from 'react';
import Image from 'react-bootstrap/Image';
import BallLogo from '../../assets/images/logo.png';
import './Logo.scss';

const Logo = () => {
	return <Image className="Logo" src={BallLogo} />;
};

export default Logo;
