const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './api/db/products.db',
});
const Conf = require('./config');

class Group extends Model {
  static async configStore() {
    let store;
    store = await Conf.findOne({
      attributes: ['config_name', 'config_value'],
      where: { config_name: 'store_id' },
    });
    this.storId = store.config_value;
  }
}

Group.init(
  {
    parent_id: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.UUID,
      // defaultValue: '20180608-EEA0-408D-807D-6AB73272E383',
      defaultValue: this.storeId,
    },
    user_id: {
      type: DataTypes.TEXT,
      defaultValue: '01-000000000910281',
    },
  },
  {
    sequelize,
    tableName: 'groups',
    timestamps: true,
    underscored: true,
  },
);

module.exports = Group;
