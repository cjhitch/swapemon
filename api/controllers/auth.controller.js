const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Users } = require('../models');
require('dotenv').config();

const email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
const pass = process.env.MAILER_PASSWORD || 'auth_email_pass';

const smtpTransport = nodemailer.createTransport({
	service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
	auth: {
		user: email,
		pass,
	},
});

exports.formLogin = async (req, res) => {
	// pull the username and password from the body
	const { password, username } = req.body;
	try {
		const user = await Users.findOne({ where: { username } });
		const truthyPW = bcrypt.compareSync(password, user.dataValues.password);
		if (truthyPW) {
			const myUser = {
				id: user.dataValues.id,
				username: user.dataValues.username,
				first_name: user.dataValues.first_name,
				last_name: user.dataValues.last_name,
				email: user.dataValues.last_name,
			};
			const token = jwt.sign(
				{ id: user.dataValues.id },
				process.env.SECRET
			);
			res.json({ token, loggedIn: true, user: myUser });
		}
	} catch (e) {
		// log the error
		error(e);
		// send an unauthorized res if something fails to work
		res.status(401).json({ loggedIn: false });
	}
};

// eslint-disable-next-line
exports.forgot_password = async (req, res) => {
	const user = await Users.findOne({
		where: { email: req.body.email },
	});
	const token = crypto.randomBytes(20).toString('hex');
	user.update({
		resetPasswordToken: token,
		resetPasswordExpires: Date.now() + 3600000,
	});
	const data = {
		to: user.email,
		from: email,
		template: 'forgot-password-email',
		subject: 'Password help has arrived!',
		context: {
			url: `http://localhost:3000/auth/reset_password?token=${token}`,
			name: `${user.dataValues.first_name} ${user.dataValues.last_name}`,
		},
	};
	smtpTransport.sendMail(data, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json('recovery email sent');
	});
};

// eslint-disable-next-line
exports.reset_password = (req, res, next) => {
	Users.findOne({
		reset_password_token: req.body.token,
		reset_password_expires: {
			$gt: Date.now(),
		},
		// eslint-disable-next-line
	}).exec((err, user) => {
		const newUser = user;
		if (!err && user) {
			if (req.body.newPassword === req.body.verifyPassword) {
				newUser.hash_password = bcrypt.hashSync(
					req.body.newPassword,
					10
				);
				newUser.reset_password_token = undefined;
				newUser.reset_password_expires = undefined;
				// eslint-disable-next-line
				newUser.save((errors, done) => {
					if (errors) {
						return res.status(422).send({
							message: errors,
						});
					}
					const data = {
						to: user.email,
						from: email,
						template: 'reset-password-email',
						subject: 'Password Reset Confirmation',
						context: {
							name: user.fullName.split(' ')[0],
						},
					};

					smtpTransport.sendMail(data, (errs) => {
						if (!err) {
							return res.json({ message: 'Password reset' });
						}
						return done(errs);
					});
				});
			} else {
				return res.status(422).send({
					message: 'Passwords do not match',
				});
			}
		} else {
			return res.status(400).send({
				message: 'Password reset token is invalid or has expired.',
			});
		}
	});
};
