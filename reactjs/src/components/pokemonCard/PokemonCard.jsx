import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
	BiFemaleSign,
	BiMaleSign,
	BiCircle,
	BiChevronDown,
	BiPencil,
	BiTrash,
	BiShare,
} from 'react-icons/bi';
import { fetchMoves } from '../../store/moves/actions';
import { deleteUsermon } from '../../store/usermons/actions';
import TypePills from '../typePills';
import Shiny from '../../assets/images/icons/shiny.svg';
import './PokemonCard.scss';

const PokemonCard = ({ pokemon, addTrade, setPokeId }) => {
	const pokeMoves = useSelector((state) => state.moves);
	const [moves, setMoves] = useState([]);
	// const pokeData = useSelector((state) => state.usermons);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMoves());
		// this should only run once to run similar to componentDidMount()
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (pokeMoves.allIds.length > 0) {
			setMoves(pokeMoves.byId);
		}
	}, [pokeMoves]);

	useEffect(() => {
		console.log(moves);
	}, [moves]);

	// TODO: this will be once the user logged in
	const username = 'JamesEarlJones';
	const [expanded, setExpanded] = useState(false);
	const pokePath = () => {
		try {
			console.log(pokemon.name);
			return require(`../../assets/images/icons/pokemon/${
				pokemon.shiny || pokemon.shiny === 0 ? 'shiny/' : 'regular/'
			}${pokemon.name}.svg`);
		} catch (err) {
			return null;
		}
	};
	const pokeImg = pokePath();

	const ballPath = () => {
		try {
			console.log(pokemon.ball);
			return require(`../../assets/images/icons/balls/${pokemon.ball}.svg`);
		} catch (err) {
			return null;
		}
	};

	// run through the data and get types based on the move name - this will be fixed in the database
	const getType = (move) => {
		console.log('move: ', move, moves);
		return moves[move].data.type;
	};

	const ball = ballPath();
	return (
		<>
			<article className="PokemonCard">
				<Image
					className="pokemon"
					src={pokeImg !== null ? pokeImg.default : ''}
				/>
				<h2>
					{pokemon.name && pokemon.name}
					{(pokemon.shiny || pokemon.shiny === 0) && (
						<span>
							{' '}
							<Image src={Shiny} />
						</span>
					)}
				</h2>
				<p className="dex">
					Dex:
					<span> {pokemon.dex && pokemon.dex}</span>
				</p>
				<Image
					className="ball"
					src={ball !== null ? ball.default : ''}
				/>
				<p className="level">
					<b>Lv. </b>
					{pokemon.level && pokemon.level}
				</p>
				<div className="type">
					{pokemon.types &&
						pokemon.types.map((type) => (
							<TypePills
								key={type.name}
								type={type.type}
								name={type.name}
							/>
						))}
				</div>
				<p className="gender">
					{pokemon.gender && pokemon.gender[0] === 'female' ? (
						<BiFemaleSign />
					) : pokemon.gender && pokemon.gender[0] === 'male' ? (
						<BiMaleSign />
					) : (
						<BiCircle />
					)}
					<span> {pokemon.gender && pokemon.gender[1]}</span>
				</p>
				<p className="ability">{pokemon.ability && pokemon.ability}</p>
				<div
					className="iv-em"
					style={
						expanded ? { display: 'block' } : { display: 'none' }
					}
				>
					<div className="ivs">
						{pokemon.ivs &&
							pokemon.ivs.map((iv) => (
								<p key={Object.keys(iv)}>
									<b>{Object.keys(iv)}</b>
									<span>{iv[Object.keys(iv)]}</span>
								</p>
							))}
					</div>
					<div className="em">
						<h3>Egg Moves:</h3>
						{
							// eslint-disable-next-line
						(pokemon.eggMoves && pokeMoves.allIds.length > 0 ) &&
								pokemon.eggMoves.map((move, i) =>
									console.log(pokemon.eggMoves)(
										// I want this to say the number of each move for the key
										//  eslint-disable-next-line
						<p key={`move-${i}`}>
											<TypePills
												variant="round"
												type={getType(move)}
											/>
											<span>
												{move[
													Object.keys(move)
												].toString()}
											</span>
										</p>
									)
								)
						}
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
								style={
									expanded && { transform: 'rotate(180deg)' }
								}
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
								style={
									expanded && { transform: 'rotate(180deg)' }
								}
							/>
						</button>
						<BiTrash onClick={() => setShow(true)} />
					</div>
				)}
			</article>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete?</Modal.Title>
				</Modal.Header>

				<Modal.Footer>
					<Button onClick={() => setShow(false)} variant="tertiary">
						Close
					</Button>
					<Button
						onClick={() =>
							dispatch(deleteUsermon(username, pokemon.id))
						}
						variant="secondary"
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
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
