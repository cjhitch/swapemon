import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './FormControl.scss';

const FormControl = ({ value, update, type, id, label, name, options }) => {
	return (
		<div className="FormControl">
			{type === 'check' ? (
				<Form.Check
					type={type}
					id={`${type}-${id}`}
					value={value}
					checked={value}
					onChange={(e) => update(id, e.target.value)}
				/>
			) : label ? (
				<Form.Group>
					<Form.Label>{label}</Form.Label>
					<Form.Control as={type} placeholder={name}>
						{options &&
							options.map((opt) => (
								<option key={opt.name} value={opt.id} />
							))}
					</Form.Control>
				</Form.Group>
			) : (
				<Form.Control as={type} placeholder={name}>
					{options &&
						options.map((opt) => (
							<option key={opt.name} value={opt.id} />
						))}
				</Form.Control>
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
	type: PropTypes.string.isRequired,
	id: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.arrayof(PropTypes.string),
};

FormControl.defaultProps = {
	id: null,
	label: null,
	name: null,
	options: [],
};

export default FormControl;
