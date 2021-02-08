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

// add a new pokeball
exports.createPokeball = async (req, res) => {
	// get the post_id and user from the request body
	const { name, sprite } = req.body;
	try {
		// create the item and save the new option
		const newPokeball = await Pokeballs.create({ name, sprite });
		// send the new id back to the req
		res.status(200).json({ id: newPokeball.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// update an existing pokeball
exports.updatePokeball = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	try {
		const [, [updatedPokeball]] = await Pokeballs.update(req.body, {
			// only update the row using the id in the url
			where: { id },
			// return the updated row
			returning: true,
		});
		// send the updated pokeball back to the front-end
		res.status(200).json(updatedPokeball);
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// delete a pokeball
exports.removePokeball = async (req, res) => {
	// get the id from the route
	const { id } = req.params;
	// remove the pokeball
	await Pokeballs.destroy({ where: { id } });
	// send a good status code
	res.sendStatus(200);
};
