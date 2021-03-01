// load the pokemon model
const { Messages } = require('../models');

// add a new message
exports.createMessage = async (req, res) => {
	// get the post_id and user from the request body
	// eslint-disable-next-line
	const { post } = req.body;
	console.log(post);
	try {
		// create the item and save the new option
		const newMessage = await Messages.create({
			id: post.id,
			from: post.from,
			message: post.message,
			conversationId: post.conversationId,
		});
		// send the new id back to the req
		res.status(200).json({ id: newMessage.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// update an existing message
exports.updateMessage = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	try {
		const [, [updatedMessage]] = await Messages.update(req.body, {
			// only update the row using the id in the url
			where: { id },
			// return the updated row
			returning: true,
		});
		// send the updated message back to the front-end
		res.status(200).json(updatedMessage);
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// delete a message
exports.removeMessage = async (req, res) => {
	// get the id from the route
	const { id } = req.params;
	console.log(id);
	// remove the message
	await Messages.destroy({ where: { id } });
	// send a good status code
	res.sendStatus(200);
};
