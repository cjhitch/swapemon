import React from 'react';
import AddPokemon from '../../components/addPokemon';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<section className="Dashboard">
			<h1>Add Pokemon</h1>
			<AddPokemon />
		</section>
	);
};

export default Dashboard;
