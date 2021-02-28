import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import './TypePills.scss';

const TypePills = ({
	type,
	name,
	variant,
	clickable,
	newPokemon,
	setNewPokemon,
}) => {
	const [clicked, setClicked] = useState(false);
	const imgPath = () => {
		try {
			return require(`../../assets/images/icons/${type}.svg`);
		} catch (err) {
			return undefined;
		}
	};
	const img = imgPath();
	useEffect(() => {
		if (newPokemon && newPokemon.moves) {
			newPokemon.moves.forEach((move) => {
				if (move === name) {
					setClicked(true);
				}
			});
		}
		// this should not be watching clicked, should only be watching initial
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPokemon]);
	const clickHandler = (move) => {
		console.log('click handler running');
		if (clickable) {
			console.log(move);
			const index = newPokemon.moves.indexOf(move);
			const newMoves = newPokemon.moves;
			if (index !== -1) {
				console.log('removing move: ', newMoves[index]);
				newMoves.splice(index, 1);
				setClicked(!clicked);
			} else {
				// eslint-disable-next-line
				if (newMoves.length < 4) {
					newMoves.push(move);
					setClicked(!clicked);
				} else {
					// TODO: replace alert
					// eslint-disable-next-line no-alert
					alert(
						'cannot select anymore moves, please deselect one first!'
					);
				}
			}
			setNewPokemon({ ...newPokemon, moves: newMoves });
		}
	};
	return (
		<button
			value={clicked}
			onClick={() => {
				clickHandler(name);
			}}
			type="button"
			className={`TypePills 
				${variant !== 'pill' ? 'round' : ''}
				${type} ${!clickable ? '' : 'clickable'}
			`}
		>
			<Image src={img ? img.default : ''} />
			{variant === 'pill' && <>{name}</>}
		</button>
	);
};

TypePills.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	variant: PropTypes.string,
	clickable: PropTypes.bool,
};

TypePills.defaultProps = {
	variant: 'pill',
	name: 'normal',
	clickable: false,
};

export default TypePills;
