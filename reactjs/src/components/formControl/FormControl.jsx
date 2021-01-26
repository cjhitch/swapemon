import React from 'react';
import PropTypes from 'prop-types';
import './FormControl.scss';

const FormControl = ({ value, update }) => {
	return (
		<div className="FormControl">
			{value}
			{update}
		</div>
	);
};

FormControl.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]).isRequired,
	update: PropTypes.func.isRequired,
};

export default FormControl;
