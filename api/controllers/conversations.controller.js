// load the pokemon model
const { Conversations, Messages } = require('../models');

// get all the conversations
exports.getConversations = async (req, res) => {
	const { userId } = req.query;
	console.log('conversations', userId);
	const conversations = await Conversations.findAll({
		include: [
			{
				model: Messages,
				required: true,
			},
		],
		where: { userId },
	});
	console.log(conversations);
	res.json(conversations);
};

// get conversation by the conversation name
exports.getOneById = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	// search our conversation model for the conversation
	const conversation = await Conversations.findByPk(id);
	// if no conversation is found
	if (!conversation) {
		// return a 404 not found code
		res.sendStatus(404);
		return;
	}

	// if the conversation is found send back
	res.json(conversation);
};

// add a new conversation
exports.createConversation = async (req, res) => {
	// get the post_id and user from the request body
	// eslint-disable-next-line
	const { post_id, user } = req.body;
	try {
		// create the item and save the new option
		const newConversation = await Conversations.create({ post_id, user });
		// send the new id back to the req
		res.status(200).json({ id: newConversation.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// update an existing conversation
exports.updateConversation = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	try {
		const [, [updatedConversation]] = await Conversations.update(req.body, {
			// only update the row using the id in the url
			where: { id },
			// return the updated row
			returning: true,
		});
		// send the updated conversation back to the front-end
		res.status(200).json(updatedConversation);
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};

// delete a conversation
exports.removeConversation = async (req, res) => {
	// get the id from the route
	const { id } = req.params;
	// remove the conversation
	await Conversations.destroy({ where: { id } });
	// send a good status code
	res.sendStatus(200);
};
