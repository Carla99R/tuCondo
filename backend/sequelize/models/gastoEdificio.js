const models = require('./index')

module.exports = (sequelize, DataTypes) => {

	const GastoEdificio = sequelize.define('gastoEdificio', {
		edificio_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true,
			references: models.edificio
		},
		gasto_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true,
			references: models.gasto
		},
		monto_edificio: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		eliminado: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}


	}, { timestamps: false });

	GastoEdificio.removeAttribute('id');

	return GastoEdificio
}