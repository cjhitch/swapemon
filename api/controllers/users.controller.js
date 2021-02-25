// const error = require('debug')('api:error');
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const { throwError, throwIf } = require('../utils/errorHandling');
const { Users, Sequelize } = require('../models');

// get all the users
exports.getUsers = async (req, res) => {
	const users = await Users.findAll();
	res.json(users);
};

// get user by the user name
exports.getOneById = async (req, res) => {
	// get the id from the route params
	const { id } = req.params;
	// search our user model for the user
	const user = await Users.findByPk(id);
	// if no user is found
	if (!user) {
		// return a 404 not found code
		res.sendStatus(404);
		return;
	}

	// if the user is found send back
	res.json(user);
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
		const hash = bcrypt.hashSync(password, 7);
		// create the user and save
		const newUser = await Users.create({
			id,
			username,
			access_token: null,
			first_name,
			last_name,
			email,
			password: hash,
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
