import React from 'react';
import Button from 'react-bootstrap/Button';
import AddPokemon from '../../components/addPokemon';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<section className="Dashboard">
			<div>
				<h1>Add Pokemon</h1>
				<AddPokemon />
				<div className="buttons filter-modal">
					<Button
						className="add"
						variant="secondary"
						size="lg"
						disabled
					>
						Add Pokemon
					</Button>
					<Button variant="tertiary" size="lg" disabled>
						Filter
					</Button>
				</div>
				<hr />
			</div>
		</section>
	);
};

export default Dashboard;
