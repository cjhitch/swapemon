import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import {
	BiFemaleSign,
	BiMaleSign,
	BiCircle,
	BiChevronDown,
} from 'react-icons/bi';
import TypePills from '../typePills';
import Shiny from '../../assets/images/icons/shiny.svg';
import './PokemonCard.scss';

const PokemonCard = ({ pokemon }) => {
	const [expanded, setExpanded] = useState(false);
	const pokePath = require(`../../assets/images/icons/pokemon/${
		pokemon.shiny ? 'shiny/' : 'regular/'
	}${pokemon.name}.svg`);

	const ballPath = require(`../../assets/images/icons/balls/${pokemon.ball}.svg`);

	return (
		<article className="PokemonCard">
			<Image className="pokemon" src={pokePath.default} />
			<h2>
				{pokemon.name}
				{pokemon.shiny && (
					<span>
						{' '}
						<Image src={Shiny} />
					</span>
				)}
			</h2>
			<p className="dex">
				Dex:
				<span> {pokemon.dex}</span>
			</p>
			<Image className="ball" src={ballPath.default} />
			<p className="level">
				<b>Lv. </b>
				{pokemon.level}
			</p>
			<div className="type">
				{pokemon.types.map((type) => (
					<TypePills
						key={type.name}
						type={type.type}
						name={type.name}
					/>
				))}
			</div>
			<p className="gender">
				{pokemon.gender[0] === 'female' ? (
					<BiFemaleSign />
				) : pokemon.gender[0] === 'male' ? (
					<BiMaleSign />
				) : (
					<BiCircle />
				)}
				<span> {pokemon.gender[1]}</span>
			</p>
			<p className="ability">{pokemon.ability}</p>
			<div
				className="iv-em"
				style={expanded ? { display: 'block' } : { display: 'none' }}
			>
				<div className="ivs">
					{pokemon.ivs.map((iv) => (
						<p key={Object.keys(iv)}>
							<b>{Object.keys(iv)}</b>
							<span>{iv[Object.keys(iv)]}</span>
						</p>
					))}
				</div>
				<div className="em">
					<h3>Egg Moves:</h3>
					{pokemon.eggMoves.map((move) => (
						<p key={Object.keys(move)}>
							<TypePills
								variant="round"
								type={Object.keys(move).toString()}
							/>
							<span>{move[Object.keys(move)].toString()}</span>
						</p>
					))}
				</div>
			</div>
			<button
				type="button"
				className="more"
				onClick={() => setExpanded(!expanded)}
			>
				View {expanded ? 'Less' : 'More'}{' '}
				<BiChevronDown
					style={expanded && { transform: 'rotate(180deg)' }}
				/>
			</button>
		</article>
	);
};

PokemonCard.propTypes = {
	pokemon: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool,
			PropTypes.array,
		])
	).isRequired,
};

export default PokemonCard;
