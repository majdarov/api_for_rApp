const Product = require('../../models/product');
const Barcode = require('../../models/barcode');
const Photo = require('../../models/photo');
const { Op } = require('sequelize');

module.exports = async function (req, res) {
  try {
    let barcodes;

    let product = await Product.create(req.body);
    
    if (req.body.barcodes && req.body.barcodes.length) {
      barcodes = await Barcode.bulkCreate(
        req.body.barcodes.map((item) => {
          return { id: product.id, barcode: item };
        }),
      );
    }
    if (req.body.photos && req.body.photos.length) {
      photos = await Photo.bulkCreate(
        req.body.photos.map((item) => {
          return { id: product.id, photo: item };
        }),
      );
    }
    res.send({created: product.id, product});
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
