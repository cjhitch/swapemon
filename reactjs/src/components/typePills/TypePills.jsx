import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import './TypePills.scss';

const TypePills = ({ type, name, variant }) => {
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
