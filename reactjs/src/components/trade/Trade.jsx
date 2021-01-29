import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import PokemonCard from '../pokemonCard';
import User from '../user';
import './Trade.scss';

const Trade = ({ myTrades }) => {
	const [myshow, setMyShow] = useState(false);
	const [show, setShow] = useState(false);
	// this info should be coming from store or db
	// eslint-disable-next-line
	const [otherUsers, setOtherUsers] = useState([
		{
			userId: '806dd04e-dae0-4e07-bc29-3013a3cdc895',
			userName: 'DarthVader',
			pokemon: [
				'c8b666af-336c-453d-be73-e700edeb3a84',
				'21c05d07-2e1e-46d6-b93b-290906b9cd2e',
				'c2d847cb-24ac-4f47-8e05-d9ba632c3980',
			],
		},
	]);
	const pokemons = [
		{
			id: 'c8b666af-336c-453d-be73-e700edeb3a84',
			name: 'Bulbasaur',
			shiny: true,
			dex: '001',
			ball: 'dream',
			level: '100',
			types: [{ type: 'grass', name: 'Grass' }],
			gender: ['male', '87.5%'],
			ability: 'Chloropphyll (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ ghost: 'Curse' },
				{ grass: 'Ingrain' },
				{ normal: 'Nature Power' },
				{ grass: 'Petal Dance' },
			],
		},
		{
			id: '21c05d07-2e1e-46d6-b93b-290906b9cd2e',
			name: 'Arcanine',
			shiny: true,
			dex: '078',
			ball: 'friend',
			level: '19',
			types: [{ type: 'fire', name: 'Fire' }],
			gender: ['male', '12.5%'],
			ability: 'Justified (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Double Edge' },
				{ normal: 'Thrash' },
				{ normal: 'Morning Sun' },
				{ normal: 'Covet' },
			],
		},
		{
			id: 'c2d847cb-24ac-4f47-8e05-d9ba632c3980',
			name: 'Machop',
			shiny: true,
			dex: '066',
			ball: 'fast',
			level: '11',
			types: [{ type: 'fight', name: 'Fight' }],
			gender: ['male', '25%'],
			ability: 'Steadfast (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: '31' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 31 },
				{ Spd: 31 },
			],
			eggMoves: [
				{ steel: 'Bullet Punch' },
				{ fight: 'Counter' },
				{ fight: 'Submission' },
				{ normal: 'Tickle' },
			],
		},
	];
	return (
		<div className="Trade">
			<div className="mytrade">
				<User username="JamesEarlJones" image="jej.jpg" />
				<PokemonCard pokemon={myTrades[0]} />
				<Button
					className="addPoke"
					disabled
					variant="primary-light"
					onClick={() => setShow(true)}
				>
					Add Pokemon
				</Button>

				<Modal show={myshow} onHide={() => setMyShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title id="example-custom-modal-styling-title">
							Add To Trade
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{/* {myPokemons.map((pokemon) => (
							<PokemonCard key={pokemon.id} pokemon={pokemon} />
						))} */}
					</Modal.Body>
				</Modal>
			</div>
			<div className="theirtrade">
				<User
					username={otherUsers[0].userName}
					image={`${otherUsers[0].userId}.jpg`}
				/>
				<Button
					className="addPoke"
					variant="primary-light"
					onClick={() => setShow(true)}
				>
					Add Pokemon
				</Button>

				<Modal
					show={show}
					onHide={() => setShow(false)}
					// dialogClassName="modal-90w"
					// aria-labelledby="example-custom-modal-styling-title"
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-custom-modal-styling-title">
							Add To Trade
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{pokemons.map((pokemon) => (
							<PokemonCard key={pokemon.id} pokemon={pokemon} />
						))}
					</Modal.Body>
				</Modal>
			</div>
			<Button variant="secondary">Propose Trade</Button>
		</div>
	);
};

Trade.propTypes = {
	myTrades: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
				PropTypes.array,
			])
		)
	).isRequired,
};

export default Trade;
