import React from 'react';
import AddPokemon from '../../components/addPokemon';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<section className="Dashboard">
			<div>
				<h1>Add Pokemon</h1>
				<AddPokemon />
			</div>
		</section>
	);
};

export default Dashboard;
