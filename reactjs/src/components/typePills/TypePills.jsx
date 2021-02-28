import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import './TypePills.scss';

const TypePills = ({ type, name, variant, clickable }) => {
	const [clicked, setClicked] = useState(false);
	const imgPath = () => {
		try {
			return require(`../../assets/images/icons/${type}.svg`);
		} catch (err) {
			return undefined;
		}
	};
	const img = imgPath();
	const clickHandler = () => {
		if (clickable) {
			setClicked(!clicked);
		}
	};
	return (
		<button
			value={clicked}
			onClick={clickHandler}
			type="button"
			className={`TypePills 
				${variant !== 'pill' ? 'round' : ''}
				${type} ${clickable ? 'clickable' : ''}
			`}
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
	clickable: PropTypes.bool,
};

TypePills.defaultProps = {
	variant: 'pill',
	name: 'normal',
	clickable: false,
};

export default TypePills;
