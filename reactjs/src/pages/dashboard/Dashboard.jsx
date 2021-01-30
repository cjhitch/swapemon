import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PokemonCard from '../../components/pokemonCard';
import AddPokemon from '../../components/addPokemon';
import './Dashboard.scss';

const Dashboard = () => {
	const [show, setShow] = useState(false);
	const [filterShow, setFilterShow] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [myPokemon, setMyPokemon] = useState([
		{
			name: 'Charizard',
			shiny: true,
			dex: '006',
			ball: 'dream',
			level: '100',
			types: [
				{ type: 'fire', name: 'Fire' },
				{ type: 'flying', name: 'Flying' },
			],
			gender: ['male', '87.5%'],
			ability: 'Solar Power (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Belly Drum' },
				{ dark: 'Bite' },
				{ dragon: 'Dragon Tail' },
				{ flying: 'Wing Attack' },
			],
		},
		{
			name: 'Venusaur',
			shiny: false,
			dex: '003',
			ball: 'beast',
			level: '85',
			types: [
				{ type: 'grass', name: 'Grass' },
				{ type: 'poison', name: 'Poison' },
			],
			gender: ['female', '12.5%'],
			ability: 'Chlorophyll (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Skull Bash' },
				{ grass: 'Petal Dance' },
				{ ghost: 'Curse' },
				{ grass: 'Ingrain' },
			],
		},
		{
			name: 'Arcanine',
			shiny: true,
			dex: '059',
			ball: 'love',
			level: '45',
			types: [{ type: 'fire', name: 'Fire' }],
			gender: ['male', '75%'],
			ability: 'Intimidate',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ normal: 'Thrash' },
				{ normal: 'Double-Edge' },
				{ normal: 'Morning Sun' },
				{ normal: 'Covet' },
			],
		},
		{
			name: 'Beedrill',
			shiny: false,
			dex: '015',
			ball: 'pokeball',
			level: '15',
			types: [
				{ type: 'bug', name: 'Bug' },
				{ type: 'poison', name: 'Poison' },
			],
			gender: ['female', '50%'],
			ability: 'Sniper (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [],
		},
		{
			name: 'Pidgeotto',
			shiny: false,
			dex: '017',
			ball: 'moon',
			level: '66',
			types: [{ type: 'flying', name: 'Flying' }],
			gender: ['female', '87.5%'],
			ability: 'Solar Power (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ flying: 'Air Cutter' },
				{ flying: 'Brave Bird' },
				{ dark: 'Feint Attack' },
				{ psychic: 'Foresight' },
			],
		},
		{
			name: 'Vulpix-Alola',
			shiny: true,
			dex: '037',
			ball: 'friend',
			level: '22',
			types: [{ type: 'ice', name: 'Ice' }],
			gender: ['female', '75%'],
			ability: 'Snow Warning (Hidden)',
			ivs: [
				{ HP: 31 },
				{ Atk: 'N/A' },
				{ Def: 31 },
				{ SpAtk: 'N/A' },
				{ SpDef: 30 },
				{ Spd: 30 },
			],
			eggMoves: [
				{ psychic: 'Agility' },
				{ fairy: 'Charm' },
				{ normal: 'Disable' },
				{ normal: 'Encore' },
			],
		},
	]);
	useEffect(() => {
		if (myPokemon.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [myPokemon]);
	return (
		<section className="Dashboard">
			<div>
				<h1>Add Pokemon</h1>
				<AddPokemon
					id="lg"
					setMyPokemon={setMyPokemon}
					myPokemon={myPokemon}
				/>
				<div className="buttons filter-modal">
					<Button
						className="add"
						variant="secondary"
						size="lg"
						onClick={() => setShow(true)}
					>
						Add Pokemon
					</Button>
					<Button
						variant="tertiary"
						size="lg"
						disabled={isDisabled}
						onClick={() => setFilterShow(true)}
					>
						Filter
					</Button>
				</div>
				<hr />
				<div className="pokemon-list">
					{myPokemon.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							pokemon={pokemon}
							myPokemon={myPokemon}
						/>
					))}
				</div>
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
			<Modal
				show={filterShow}
				onHide={() => setFilterShow(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header closeButton>
					<h1>Add Pokemon</h1>
				</Modal.Header>
				<AddPokemon setMyPokemon={setMyPokemon} />
			</Modal>
		</section>
	);
};

export default Dashboard;
