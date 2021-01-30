import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PokemonCard from '../../components/pokemonCard';
import AddPokemon from '../../components/addPokemon';
import './Dashboard.scss';

const Dashboard = () => {
	const [show, setShow] = useState(false);
	const [myPokemon, setMyPokemon] = useState([]);
	return (
		<section className="Dashboard">
			<div>
				<h1>Add Pokemon</h1>
				<AddPokemon id="lg" setMyPokemon={setMyPokemon} />
				<div className="buttons filter-modal">
					<Button
						className="add"
						variant="secondary"
						size="lg"
						onClick={() => setShow(true)}
					>
						Add Pokemon
					</Button>
					<Button variant="tertiary" size="lg" disabled>
						Filter
					</Button>
				</div>
				<hr />
			</div>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header closeButton>
					<h1>Add Pokemon</h1>
				</Modal.Header>
				<AddPokemon setMyPokemon={setMyPokemon} />
			</Modal>
			{myPokemon.map((pokemon) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</section>
	);
};

export default Dashboard;
