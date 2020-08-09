const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/products.db',
});

class Barcode extends Model {}

Barcode.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // unique: false,
      allowNull: false
    },
    barcode: {
      type: DataTypes.STRING,
      primaryKey: true,
      // unique: true,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'barcodes',
    timestamps: false,
  },
);

module.exports = Barcode;
