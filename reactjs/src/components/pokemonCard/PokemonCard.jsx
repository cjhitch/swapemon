import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import {
	BiFemaleSign,
	BiMaleSign,
	BiCircle,
	BiChevronDown,
	BiPencil,
	BiTrash,
	BiShare,
} from 'react-icons/bi';
import TypePills from '../typePills';
import Shiny from '../../assets/images/icons/shiny.svg';
import './PokemonCard.scss';

const PokemonCard = ({ pokemon, addTrade, setPokeId }) => {
	const [expanded, setExpanded] = useState(false);
	const pokePath = () => {
		try {
			return require(`../../assets/images/icons/pokemon/${
				pokemon.shiny || pokemon.shiny === 0 ? 'shiny/' : 'regular/'
			}${pokemon.name}.svg`);
		} catch (err) {
			return null;
		}
	};
	const pokeImg = pokePath();

	const ballPath = require(`../../assets/images/icons/balls/${pokemon.ball}.svg`);
	return (
		<article className="PokemonCard">
			<Image
				className="pokemon"
				src={pokeImg !== null ? pokeImg.default : ''}
			/>
			<h2>
				{pokemon.name}
				{(pokemon.shiny || pokemon.shiny === 0) && (
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
					{pokemon.eggMoves.map((move, i) => (
						// I want this to say the number of each move for the key
						//  eslint-disable-next-line
						<p key={`move-${i}`}>
							<TypePills
								variant="round"
								type={Object.keys(move).toString()}
							/>
							<span>{move[Object.keys(move)].toString()}</span>
						</p>
					))}
				</div>
			</div>
			{addTrade ? (
				<div className="more">
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
					<button type="button" onClick={() => addTrade(pokemon)}>
						Add
					</button>
				</div>
			) : (
				<div className="more edit">
					<div>
						<BiPencil onClick={() => setPokeId(pokemon.id)} />
						<Link to="/trades">
							<BiShare />
						</Link>
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
					<BiTrash />
				</div>
			)}
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
	addTrade: PropTypes.func,
};

PokemonCard.defaultProps = {
	addTrade: null,
};

export default PokemonCard;
