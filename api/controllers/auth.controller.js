// const error = require('debug')('api:error');
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
		// error(e);
		// send an unauthorized res if something fails to work
		res.status(401).json({ loggedIn: false });
	}
};
