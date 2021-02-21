// const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const { throwError, throwIf } = require('../utils/errorHandling');
const { Users, Sequelize } = require('../models');

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

// add a new user
exports.createUser = async (req, res, next) => {
	// get the username, first, last, email, password from the request body
	try {
		// console.log(req.body);
		const {
			id,
			username,
			// eslint-disable-next-line camelcase
			first_name,
			// eslint-disable-next-line camelcase
			last_name,
			email,
			password,
		} = req.body;
		// console.log(newUsr);
		// create the user and save
		const newUser = await Users.create({
			id,
			username,
			// access_token: null,
			first_name,
			last_name,
			email,
			password,
		})
			.catch(
				new Sequelize.ValidationError(),
				throwError(406, 'Validation Error')
			)
			.catch(
				new Sequelize.BaseError(),
				throwError(
					500,
					'A database error has occurred please try again.'
				)
			);
		// console.log('new user: ', newUser);
		// send the new id back to the req
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};
