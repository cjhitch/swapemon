// load the pokemon model
const { Pokeballs } = require('../models');

// get all the pokeballs
exports.getPokeballs = async (req, res) => {
	const pokeballs = await Pokeballs.findAll();
	res.json(pokeballs);
};

// get pokeball by the pokeball name
exports.getOneById = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	// search our pokeball model for the pokeball
	const pokeball = await Pokeballs.findByPk(id);
	// if no pokeball is found
	if (!pokeball) {
		// return a 404 not found code
		res.sendStatus(404);
		return;
	}

	// if the pokeball is found send back
	res.json(pokeball);
};
