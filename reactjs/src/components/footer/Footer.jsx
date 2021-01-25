import React from 'react';
import Logo from '../logo';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className="Footer">
			<Logo variant="footer" />
			<p>
				&copy; {new Date().getFullYear()} Swapémon. All Rights Reserved
			</p>
		</footer>
	);
};

export default Footer;
