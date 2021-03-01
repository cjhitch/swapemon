import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './About.scss';
import Button from 'react-bootstrap/Button';
import API from '../../API';
import FormControl from '../../components/formControl';

const About = () => {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});
	const update = (inputId, val) => {
		setInputs({ ...inputs, [inputId]: val });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			inputs.name !== '' &&
			inputs.email !== '' &&
			inputs.message !== ''
		) {
			const res = await API.post('/auth/contact', { inputs });
			console.log(res);
		}
	};
	return (
		<div className="About">
			<h1>About Us</h1>
			<p>
				As an avid Pokemon fan Christopher found himself spending hours
				on the games through the multiple generations of Nintendo
				consoles. After learning about the breeding system he like many
				others spent a lot of time making spreadsheets, and whisking
				away the hours trading with others. In the experience he often
				found himself frustrated at the lack of functionality these
				spreadsheet gave. Often times they would break, or simply could
				not be found.
				<br />
				<br />
				<span>
					Enter Swapemon! The Pokemon tracking software for the Pros.
				</span>
				<br />
				<br />
				Never again lose track or manually update changes to your
				Pokmon. Track everything with ease here! Coming soon, player to
				player trades. No longer will you delete or scratch off a
				pokemon from your spreadsheet. The hard work and dedication you
				have put into your Pokemon will be passed on to the next trainer
				as you receive theirs.
			</p>
			<form className="mt-5" onSubmit={submitHandler}>
				<fieldset>
					<legend className="mb-5">
						Questions?.. &nbsp;Concerns?.. &nbsp;Contact Us
					</legend>
					<FormControl
						value={inputs.name}
						update={update}
						id="name"
						placeholder="Herby Hancock"
					/>
					<FormControl
						value={inputs.email}
						update={update}
						id="email"
						placeholder="email@email.com"
					/>
					<FormControl
						value={inputs.phone}
						update={update}
						id="phone"
						placeholder="(555) 555 - 5555"
					/>
					<FormControl
						value={inputs.message}
						update={update}
						id="message"
						placeholder="Leave us a message... preferably nice"
					/>
					<Button type="submit">Submit</Button>
				</fieldset>
			</form>
		</div>
	);
};

export default About;
