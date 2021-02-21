const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

exports.formLogin = async (req, res) => {
	// pull the username and password from the body
	const { username, password } = req.body;
	let hashPw;
	bcrypt.hash(password, 17, (err, hash) => {
		hashPw = hash;
	});
	try {
		const [user] = await Users.upsert(
			{
				username,
				name: username,
				password: hashPw,
			},
			{ returning: true }
		);
		const token = jwt.sign({ id: user.id }, process.env.SECRET);
		res.json({ token, loggedIn: true });
	} catch (e) {
		// log the error
		error(e);
		// send an unauthorized res if something fails to work
		res.status(401).json({ loggedIn: false });
	}
};

// add a new user
exports.createUser = async (req, res) => {
	// get the post_id and user from the request body
	// eslint-disable-next-line
	const { post_id, user } = req.body;
	try {
		// create the item and save the new option
		const newUser = await Users.create({ post_id, user });
		// send the new id back to the req
		res.status(200).json({ id: newUser.id });
	} catch (e) {
		// map the errors messages to send them back
		const errors = e.errors.map((err) => err.message);
		res.status(400).json({ errors });
	}
};
