const Product = require('../../models/product');

module.exports = async function(req, res) {

    await Product.destroy({
        where: {
            id: req.params.id
        }
    });

    res.json({deleted: req.params.id});
}