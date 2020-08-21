const Product = require('../../models/product');
const Photo = require('../../models/photo');
const { createRequestAxios, fetchEvoAxios } = require('../api_evotor');

module.exports = async function (req, res) {
  try {
    let request = await createRequestAxios({
      type: 'delete_product_v2',
      id: req.params.id,
    });
    let response = await fetchEvoAxios(request);

    if (response.status === 204) {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });

      await Photo.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.json({ deleted: req.params.id });
    } else {
        res.send(response.data);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
