const sequelize = require('sequelize');
const Barcode = require('./barcode');
const Product = require('./product');
const Photo = require('./photo');


Product.hasMany(Barcode, { /* as: 'barcodes', */ foreignKey: 'id', onDelete: 'CASCADE' });
Barcode.belongsTo(Product, { foreignKey: 'id' });

Product.hasMany(Photo, {/* as: 'photos', */ foreignKey: 'id'});
Photo.hasMany(Product, {/* as: 'products', */ foreignKey: 'id'});