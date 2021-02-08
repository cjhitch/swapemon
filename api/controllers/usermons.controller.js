// load in the usermon model
const { Usermons } = require('../models');

// get all the usermons that belong to one user
exports.getUserUsermons = async (req, res) => {
	// get the user id from the query
	const { userId } = req.query;
	// filter the usermons to only usermons for this user
	const userUsermons = await Usermons.findAll({ where: { userId } });
	// respond with the json of the user's usermons array
	res.json(userUsermons);
};

// find one usermon by id
exports.getOneById = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	// search our usermons model for the usermon
	const usermon = await Usermons.findByPk(id);
	// if no usermon is found
	if (!usermon) {
		// return a 404 not found code
		res.sendStatus(404);
		return;
	}
	// if the usermon is found send it back
	res.json(usermon);
};

// add a new usermon
exports.createUsermon = async (req, res) => {
	// get the title and type titles from the request body
	const { title, userId } = req.body;
	try {
		// create the item and save the new option
		const newUsermon = await Usermons.create({ title, userId });
		// send the new id back to the req
		res.json({ id: newUsermon.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// update an existing usermon
exports.updateUsermon = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	try {
		const [, [updatedUsermon]] = await Usermons.update(req.body, {
			// only update the row using the id in the url
			where: { id },
			// return the updated row
			returning: true,
		});
		// send the updated usermon back to the front-end
		res.json(updatedUsermon);
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// delete a usermon
exports.removeUsermon = async (req, res) => {
	// get the id from the route
	const { id } = req.params;
	// remove the usermon
	await Usermons.destroy({ where: { id } });
	// send a good status code
	res.sendStatus(200);
};
