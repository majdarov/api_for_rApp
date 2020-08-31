const Product = require('../../models/product');
const Barcode = require('../../models/barcode');
const Photo = require('../../models/photo');
const { createRequestAxios, fetchEvoAxios } = require('../api_evotor');

module.exports = async function (req, res) {
  let errors = [];
  let errPost;
  try {
    let request = await createRequestAxios({
      type: 'post_product_v2',
      body: req.body,
    });
    let response = await fetchEvoAxios(request);
    
    if (response.Error) {
      let err = response.Error.response;
      errors = [...err.data.violations]
      errPost = {name: err.data.code, message: err.data.message,errors}
      throw new Error(err.data.code);
    }
    
    if (true) { //Если успешно отправилось в облако!!!
      let barcodes;
      var product = await Product.create(response);

      if (response.barcodes && response.barcodes.length) {
        barcodes = await Barcode.bulkCreate(
          response.barcodes.map((item) => {
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
    }
    res.send({ created: product.id, product });
  } catch (err) {
    // console.log(err);
    res.status(400).send(errPost);
  }
};
