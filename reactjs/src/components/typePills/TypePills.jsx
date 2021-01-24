import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import './TypePills.scss';

const TypePills = ({ type, name, variant }) => {
	// disabling eslint on next line - using .default to ensure it's not bringing in a module and using a dynamic import from the prop
	// also to allow require not at the top of the file. This image is dependent on the prop and cannot be at the top of the file
	// eslint-disable-next-line
	const imgPath = require(`../../assets/images/icons/${type}.svg`);
	return (
		<button
			type="button"
			className={`TypePills ${variant !== 'pill' ? 'round' : ''} ${type}`}
		>
			<Image src={imgPath.default} />
			{variant === 'pill' && <span>{name}</span>}
		</button>
	);
};

TypePills.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	variant: PropTypes.string,
};

TypePills.defaultProps = {
	variant: 'pill',
	name: 'normal',
};

export default TypePills;
