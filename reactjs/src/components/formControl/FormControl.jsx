import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './FormControl.scss';

const FormControl = ({
	value,
	update,
	type,
	id,
	label,
	options,
	placeholder,
	disabled,
	// num,
	max,
	multiple,
	resetSelect,
}) => {
	return (
		<div className={`FormControl ${id}`}>
			{type === 'checkbox' ? (
				<Form.Check
					disabled={disabled}
					type={type}
					id={id}
					label={label}
					onClick={(e) => update(id, e.target.value)}
					value={value}
				/>
			) : options.length > 0 ? (
				<Form.Group controlId={id}>
					{label && <Form.Label>{label}</Form.Label>}
					<Form.Control
						multiple={multiple}
						disabled={disabled}
						as="select"
						value={
							value === '' || resetSelect ? placeholder : value
						}
						onChange={(e) => update(id, e.target.value)}
					>
						<option disabled>{placeholder}</option>
						{options &&
							options
								.filter((opt) => opt !== 'undefined undefined%')
								.map((opt) => <option key={opt}>{opt}</option>)}
					</Form.Control>
				</Form.Group>
			) : (
				<Form.Group>
					{label && <Form.Label htmlFor={id}>{label}</Form.Label>}
					<Form.Control
						disabled={disabled}
						value={value}
						onChange={(e) => update(id, e.target.value)}
						as="input"
						type={type}
						placeholder={placeholder}
						id={id}
						max={max !== -1 ? max : ''}
					/>
				</Form.Group>
			)}
		</div>
	);
};

FormControl.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
	]),
	update: PropTypes.func.isRequired,
	type: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	disabled: PropTypes.bool,
	// num: PropTypes.bool,
	max: PropTypes.number,
	multiple: PropTypes.bool,
	resetSelect: PropTypes.bool,
};

FormControl.defaultProps = {
	value: '',
	id: null,
	type: 'select',
	label: null,
	placeholder: null,
	options: [],
	disabled: false,
	// num: false,
	max: -1,
	multiple: false,
	resetSelect: false,
};

export default FormControl;
