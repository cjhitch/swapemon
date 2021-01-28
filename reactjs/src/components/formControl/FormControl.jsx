import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './FormControl.scss';

const FormControl = ({ value, update, type, id, label, name, options }) => {
	return (
		<div className="FormControl">
			{type === 'checkbox' ? (
				<Form.Check
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
						as="select"
						onChange={(e) => update(id, e.target.value)}
					>
						{options &&
							options.map((opt) => (
								<option key={opt}>{opt}</option>
							))}
					</Form.Control>
				</Form.Group>
			) : (
				<Form.Group>
					{label && <Form.Label htmlFor={id}>{label}</Form.Label>}
					<Form.Control
						value={value}
						onChange={(e) => update(id, e.target.value)}
						as={type}
						placeholder={name}
						id={id}
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
	]).isRequired,
	update: PropTypes.func.isRequired,
	type: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
};

FormControl.defaultProps = {
	id: null,
	type: 'select',
	label: null,
	name: null,
	options: [],
};

export default FormControl;
