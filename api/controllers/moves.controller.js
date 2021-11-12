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

// add a new move
exports.createMove = async (req, res) => {
	// get the post_id and user from the request body
	const { name, type } = req.body;
	try {
		// create the item and save the new option
		const newMove = await Moves.create({ name, type });
		// send the new id back to the req
		res.status(200).json({ id: newMove.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// update an existing move
exports.updateMove = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	try {
		const [, [updatedMove]] = await Moves.update(req.body, {
			// only update the row using the id in the url
			where: { id },
			// return the updated row
			returning: true,
		});
		// send the updated move back to the front-end
		res.status(200).json(updatedMove);
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// delete a move
exports.removeMove = async (req, res) => {
	// get the id from the route
	const { id } = req.params;
	// remove the move
	await Moves.destroy({ where: { id } });
	// send a good status code
	res.sendStatus(200);
};
