const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const async = require('async_hooks');
const { Users } = require('../models');
require('dotenv').config();

const email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
const pass = process.env.MAILER_PASSWORD || 'auth_email_pass';

const smtpTransport = nodemailer.createTransport({
	service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
	auth: {
		user: email,
		pass,
	},
});

const handlebarsOptions = {
	viewEngine: 'handlebars',
	viewPath: path.resolve('./api/templates/'),
	extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

exports.render_forgot_password_template = (req, res) => {
	return res.sendFile(path.resolve('./public/forgot-password.html'));
};

exports.render_reset_password_template = (req, res) => {
	return res.sendFile(path.resolve('./public/reset-password.html'));
};

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

exports.forgot_password = (req, res) => {
	console.log('in forgot password');
	async.waterfall(
		[
			(done) => {
				Users.findOne({
					email: req.body.email,
				}).exec((err, user) => {
					if (user) {
						done(err, user);
					} else {
						done('User not found.');
					}
				});
			},
			(user, done) => {
				// create the random token
				crypto.randomBytes(20, (err, buffer) => {
					const token = buffer.toString('hex');
					done(err, user, token);
				});
			},
			(user, token, done) => {
				Users.findByIdAndUpdate(
					{ id: user.id },
					{
						reset_password_token: token,
						reset_password_expires: Date.now() + 86400000,
					},
					{ upsert: true, new: true }
				).exec((err, newUser) => {
					done(err, token, newUser);
				});
			},
			(token, user, done) => {
				const data = {
					to: user.email,
					from: email,
					template: 'forgot-password-email',
					subject: 'Password help has arrived!',
					context: {
						url: `http://localhost:3000/auth/reset_password?token=${token}`,
						name: user.fullName.split(' ')[0],
					},
				};

				smtpTransport.sendMail(data, (err) => {
					if (!err) {
						return res.json({
							message:
								'Kindly check your email for further instructions',
						});
					}
					return done(err);
				});
			},
		],
		(err) => {
			return res.status(422).json({ message: err });
		}
	);
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
