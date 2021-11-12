// load the pokemon model
const { Pokemon } = require('../models');

// get all the pokemon
exports.getPokemon = async (req, res) => {
	const pokemons = await Pokemon.findAll();
	res.json(pokemons);
};

// get pokemon by the pokemon name
exports.getOneById = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	// search our pokemon model for the pokemon
	const pokemon = await Pokemon.findByPk(id);
	// if no pokemon is found
	if (!pokemon) {
		// return a 404 not found code
		res.sendStatus(404);
		return;
	}

	// if the pokemon is found send back
	res.json(pokemon);
};

// add a new pokemon
exports.createPokemon = async (req, res) => {
	// get the post_id and user from the request body
	const { pokemon } = req.body;
	try {
		// create the item and save the new option
		const newPokemon = await Pokemon.create({ pokemon });
		// send the new id back to the req
		res.status(200).json({ id: newPokemon.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// update an existing pokemon
exports.updatePokemon = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	try {
		const [, [updatedPokemon]] = await Pokemon.update(req.body, {
			// only update the row using the id in the url
			where: { id },
			// return the updated row
			returning: true,
		});
		// send the updated pokemon back to the front-end
		res.status(200).json(updatedPokemon);
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// delete a pokemon
exports.removePokemon = async (req, res) => {
	// get the id from the route
	const { id } = req.params;
	// remove the pokemon
	await Pokemon.destroy({ where: { id } });
	// send a good status code
	res.sendStatus(200);
};
