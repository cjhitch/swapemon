// load the pokemon model
const { Moves } = require('../models');

// get all the moves
exports.getMoves = async (req, res) => {
	const moves = await Moves.findAll();
	res.json(moves);
};

// get move by the move name
exports.getOneById = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	// search our move model for the move
	const move = await Moves.findByPk(id);
	// if no move is found
	if (!move) {
		// return a 404 not found code
		res.sendStatus(404);
		return;
	}

	// if the move is found send back
	res.json(move);
};
