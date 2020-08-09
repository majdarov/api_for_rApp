const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/products.db',
});

class BarcodeNew extends Model {}

BarcodeNew.init(
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
    tableName: 'barcodes_new',
    timestamps: false,
  },
);

module.exports = BarcodeNew;
