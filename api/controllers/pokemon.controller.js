// load the pokemon model
const { Pokemon } = require('../models');

// get all the pokemon
exports.getPokemon = async (req, res) => {
	const pokemons = await Pokemon.findAll();
	res.json(pokemons);
};
