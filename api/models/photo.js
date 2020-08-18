const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/products.db',
});

class Photo extends Model {}

Photo.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'photos',
    timestamps: false,
    version: true
  },
);

module.exports = Photo;
