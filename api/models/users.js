const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Users.hasMany(models.conversations, {
				foreignKey: 'userId',
			});
			Users.hasMany(models.conversations, {
				foreignKey: 'otherUserId',
			});
			// define association here
		}
	}
	Users.init(
		{
			id: {
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				type: DataTypes.UUID,
				validate: {
					isUUID: { args: 4, msg: 'Id not valid, please try again' },
				},
			},
			username: {
				type: DataTypes.STRING,
				unique: { args: true, msg: 'Username is already in use' },
				allowNull: { args: false, msg: 'Username is required' },
			},
			access_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			first_name: {
				allowNull: { args: false, msg: 'First name is required' },
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3, 120],
						msg: 'First name must be at least 3 characters',
					},
				},
			},
			last_name: {
				allowNull: { args: false, msg: 'Last name is required' },
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [3, 120],
						msg: 'Last name must be at least 3 characters',
					},
				},
			},
			email: {
				allowNull: { args: false, msg: 'Email is required' },
				unique: { args: true, msg: 'Email is already in use' },
				type: DataTypes.STRING,
				validate: {
					// is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
					// msg: 'Please use a valid email address',
					len: {
						args: [3, 120],
						msg: 'Please use a valid email address',
					},
				},
			},
			password: {
				allowNull: { args: false, msg: 'Password is required' },
				type: DataTypes.STRING,
				validate: {
					// is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
					// msg:
					// 	'Password must be at least 8 characters, contain at least one number, one upper case, and one lower case',
					len: {
						args: [3, 120],
						msg:
							'Password must be at least 8 characters, contain at least one number, one upper case, and one lower case',
					},
				},
			},
			reset_password_token: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			reset_password_expires: {
				allowNull: true,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: 'Users',
		}
	);
	return Users;
};
