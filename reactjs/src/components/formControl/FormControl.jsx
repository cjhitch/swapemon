import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './FormControl.scss';

const FormControl = ({ value, update, type, id, label, name, options }) => {
	console.log(options);
	return (
		<div className="FormControl">
			<Form.Group controlId="formGroupEmail">
				<Form.Label>{label}</Form.Label>
				<Form.Control
					value={value}
					onChange={(e) => update(id, e.target.value)}
					as={type}
					type="email"
					placeholder={name}
					id={id}
				/>
			</Form.Group>
			<Form.Check
				type="checkbox"
				id={`default-${type}`}
				label={`default ${type}`}
			/>
			<Form.Group controlId="exampleForm.ControlSelect1">
				<Form.Label>Example select</Form.Label>
				<Form.Control as="select">
					{options &&
						options.map((opt, index) => (
							<option key={opt[index]}>{opt[index]}</option>
						))}
				</Form.Control>
			</Form.Group>
			{/* {type === 'check' ? (
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
			)} */}
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
	options: PropTypes.arrayOf(PropTypes.string),
};

FormControl.defaultProps = {
	id: null,
	label: null,
	name: null,
	options: [],
};

export default FormControl;
