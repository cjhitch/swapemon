import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import './TypePills.scss';

const TypePills = ({ type, name, variant }) => {
	const imgPath = () => {
		try {
			return require(`../../assets/images/icons/${type}.svg`);
		} catch (err) {
			return undefined;
		}
	};
	const img = imgPath();
	// console.log(
	// 	'type: ',
	// 	type,
	// 	'name: ',
	// 	name,
	// 	'variant: ',
	// 	variant,
	// 	'img: ',
	// 	img
	// );
	return (
		<button
			type="button"
			className={`TypePills ${variant !== 'pill' ? 'round' : ''} ${type}`}
		>
			<Image src={img ? img.default : ''} />
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
