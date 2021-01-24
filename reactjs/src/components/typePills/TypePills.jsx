import React from 'react';
import PropTypes from 'prop-types';
import './TypePills.scss';

const TypePills = ({ type, name }) => {
	return (
		<button type="button" className="TypePills">
			{type}
			{name}
		</button>
	);
};

TypePills.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default TypePills;
