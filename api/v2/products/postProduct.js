const Product = require('../../models/product');
const Barcode = require('../../models/barcode');

module.exports = async function (req, res) {
  try {
    
    let product;
    let barcodes;

    if (req.body.id) {
      product = await Product.findByPk(req.body.id);
      if (product) {
        
        let newData = req.body;
        newData.parent_id = req.body.parent_id ? req.body.parent_id : null;
        await Product.update(newData, {
          where: { id: req.body.id },
        });
        product = await Product.findByPk(newData.id);
        
        if (req.body.barcodes.length) {
          let arr = Array.from(req.body.barcodes)
          arr.forEach(async (item) => {
            console.log(item);
            var [barcode, created] = await Barcode.findOrCreate({
              where: { barcode: item },
              defaults: { id: product.id, barcode: item },
            });
          });
        }
      }
      // let result = {product: product.setBarcodes(barcodes), created};
      res.send(product);
      return;
    }

    product = await Product.create(req.body);
    if (req.body.barcodes.length) {
      barcodes = await Barcode.bulkCreate(
        req.body.barcodes.map((item) => {
          return { id: product.id, barcode: item };
        }),
      );
    }
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
