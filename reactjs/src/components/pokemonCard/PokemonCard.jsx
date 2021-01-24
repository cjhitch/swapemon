import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Shiny from '../../assets/images/icons/shiny.svg';
import './PokemonCard.scss';

const PokemonCard = ({
	name,
	shiny,
	dex,
	ball,
	// level,
	// types,
	// gender,
	// ability,
	// ivs,
	// moves,
}) => {
	// disabling eslint on next line - using .default to ensure it's not bringing in a module and using a dynamic import from the prop
	// also to allow require not at the top of the file. This image is dependent on the prop and cannot be at the top of the file
	// eslint-disable-next-line
	const pokePath = require(`../../assets/images/icons/pokemon/${shiny ? 'shiny/': 'regular/'}${name}.svg`);
	// eslint-disable-next-line
	const ballPath = require(`../../assets/images/icons/balls/${ball}.svg`);
	return (
		<article className="PokemonCard">
			<Image src={pokePath.default} />
			<h2>
				{name}
				{shiny && (
					<span>
						{' '}
						<Image src={Shiny} />
					</span>
				)}
			</h2>
			<h3>
				Dex:
				<span> {dex}</span>
			</h3>
			<Image src={ballPath.default} />
		</article>
	);
};

PokemonCard.propTypes = {
	name: PropTypes.string.isRequired,
	shiny: PropTypes.bool,
	dex: PropTypes.string.isRequired,
	ball: PropTypes.string.isRequired,
	// level: PropTypes.number.isRequired,
	// types: PropTypes.arrayOf(PropTypes.string).isRequired,
	// gender: PropTypes.string.isRequired,
	// ability: PropTypes.string.isRequired,
	// ivs: PropTypes.arrayOf(PropTypes.number),
	// moves: PropTypes.arrayOf(PropTypes.string),
};

PokemonCard.defaultProps = {
	shiny: false,
	// ivs: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
	// moves: ['N/A'],
};

export default PokemonCard;
