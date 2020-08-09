const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/api.db',
});

class Config extends Model {}

Config.init(
  {
    config_name: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    config_value: DataTypes.TEXT
  },
  {
    sequelize,
    tableName: 'config_store',
    timestamps: false
  },
);

module.exports = Config;
