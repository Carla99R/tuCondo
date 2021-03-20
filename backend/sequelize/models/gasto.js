const models = require('./index')

module.exports = (sequelize, DataTypes) => {

	const Gasto = sequelize.define('gasto', {
		gasto_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		factura_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true,
			references: models.factura
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		}


	}, { timestamps: false });

	return Gasto
}