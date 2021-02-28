const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Users } = require('../models');
const { throwError, throwIf } = require('../utils/errorHandling');
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
			Users.update(
				{
					access_token: token,
				},
				{
					where: { id: user.dataValues.id },
				}
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
		reset_password_token: token,
		reset_password_expires: Date.now() + 3600000,
	});
	const data = {
		to: user.email,
		from: email,
		subject: 'Password help has arrived!',
		html: `<a>http://localhost:3000/reset?token=${token}</a>`,
		text: `http://localhost:3000/reset?token=${token}`,
	};
	smtpTransport.sendMail(data, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json('recovery email sent');
	});
};

// eslint-disable-next-line
exports.reset_password = async (req, res, next) => {
	try {
		const user = await Users.findOne({
			reset_password_token: req.body.token,
			reset_password_expires: {
				$gt: Date.now(),
			},
		}).then(
			throwIf((row) => !row, 404, 'Post not found'),
			throwError(500, 'A database error has occurred, please try again.')
		);
		console.log(user);
		const hash = bcrypt.hashSync(req.body.password, 7);
		await Users.update(
			{
				password: hash,
				reset_password_token: null,
				reset_password_expires: null,
			},
			{
				where: { id: user.dataValues.id },
			}
		);
		const data = {
			to: user.email,
			from: email,
			subject: 'Password Reset Confirmation',
			text: `${user.first_name} ${user.last_name} your password has been reset. If this was not done by you please contact someone, because we probably cannot help you.`,
		};
		smtpTransport.sendMail(data, (err) => {
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json('password reset');
		});
	} catch (err) {
		return res.status(400).send({
			error: err,
			message: 'Password reset token is invalid or has expired.',
		});
	}
};