const models = require('./index')

module.exports = (sequelize, DataTypes) => {

	const GastoApartamento = sequelize.define('gastoApartamento', {
		apartamento_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true,
			references: models.apartamento
		},
		gasto_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			foreignKey: true,
			references: models.gasto
		},
		monto_apartamento: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		eliminado: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}


	}, { timestamps: false, primaryKey: false});

	GastoApartamento.removeAttribute('id');

	return GastoApartamento
}