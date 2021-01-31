import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button } from 'react-bootstrap';
import container from './container';
// import './ItemForm.scss';

const ItemForm = ({ filters, ...props }) => {
	console.log(container);
	const [form, setForm] = useState({
		title: '',
		description: '',
		type: 'plants',
	});

	const changeHandler = (e) => {
		// get the input from the event
		const { target } = e;
		// find the value of the input
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		// get the name of the input from it's attribute
		const { name } = target;
		// set the state to the name and the value
		setForm({ ...form, [name]: value });
	};

	const loadData = async () => {
		const {
			match: {
				params: { id },
			},
			fetchItem,
		} = props;
		// if no id don't load the item
		// eslint-disable-next-line no-useless-return
		if (!id) return;
		await fetchItem(id);
		// update the state with the data from the updated item
		const { item } = props;
		setForm(item);
	};

	const save = (e) => {
		e.preventDefault();
		const {
			createItem,
			updateItem,
			match: {
				params: { id },
			},
		} = props;
		const { title, description, type } = form;
		if (id) {
			updateItem({ id, title, description, type });
		} else {
			createItem({ title, description, type });
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Container className="ItemForm my-4">
			<h1>Item Form</h1>
			<Form onSubmit={save}>
				<Form.Group>
					<Form.Label htmlfor="title">Title</Form.Label>
					<Form.Control
						type="text"
						name="title"
						id="title"
						value={form.title}
						onChange={changeHandler}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label htmlfor="description">Description</Form.Label>
					<Form.Control
						type="textarea"
						name="description"
						id="description"
						value={form.description}
						onChange={changeHandler}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label htmlfor="type">Select</Form.Label>
					<Form.Control
						as="select"
						name="type"
						id="type"
						value={form.type}
						onChange={changeHandler}
					>
						{filters.map((filter) => (
							<option value={filter.id} key={filter.id}>
								{filter.name}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Button>Submit</Button>
			</Form>
		</Container>
	);
};

ItemForm.propTypes = {
	createItem: PropTypes.func.isRequired,
	updateItem: PropTypes.func.isRequired,
	fetchItem: PropTypes.func.isRequired,
	item: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		type: PropTypes.string,
	}),
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

ItemForm.defaultProps = {
	item: {},
	filters: [
		{
			id: 'lamp',
			name: 'Lamp',
		},
		{
			id: 'sofa',
			name: 'Sofa',
		},
		{
			id: 'plants',
			name: 'Plants',
		},
		{
			id: 'miniature',
			name: 'Miniature',
		},
		{
			id: 'desk',
			name: 'Desk',
		},
	],
};

export default container(ItemForm);
