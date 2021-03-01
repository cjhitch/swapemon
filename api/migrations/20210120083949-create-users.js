module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			access_token: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			first_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			last_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			reset_password_token: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			reset_password_expires: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	},
};
