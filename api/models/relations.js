const sequelize = require('sequelize');
const ProductEvo = require('./productEvo');
const Barcode = require('./barcode');
const Product = require('./product');
const ProductNew = require('./productNew');
const BarcodeNew = require('./barcodeNew');

ProductEvo.hasMany(Barcode, { /* as: 'barcodes', */ foreignKey: 'id' });
Barcode.belongsTo(ProductEvo, { foreignKey: 'id' });

Product.hasMany(Barcode, { /* as: 'barcodes', */ foreignKey: 'id' });
Barcode.belongsTo(Product, { foreignKey: 'id' });

ProductNew.hasMany(BarcodeNew, { /* as: 'barcodes', */ foreignKey: 'id' });
BarcodeNew.belongsTo(ProductNew, { foreignKey: 'id' });
