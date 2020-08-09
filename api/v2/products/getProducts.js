const parseQuery = require("../../models/parse_query");
const Product = require("../../models/product");
const { createRequestAxios, fetchEvoAxios } = require("../api_evotor");
const ProductEvo = require("../../models/productEvo");
const Barcode = require("../../models/barcode");

module.exports = async function (req, res) {
  if (!req.params.value) {
    let where = parseQuery(req.query);
    let { count, rows } = await Product.findAndCountAll({
      where,
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ["barcode"],
      },
      order: [["name", "ASC"]],
    });

    rows.map((p) => {
      p.setBarcodes(
        p.Barcodes.map((b) => {
          return b.barcode;
        })
      );
      delete p.dataValues.Barcodes;
      return p;
    });

    let result = { count, items: rows, query: req.query };
    res.send(result);
  } else if (req.params.value === "update") {
    let request = await createRequestAxios({ type: "products_v2" });
    let response = await fetchEvoAxios(request); // Get Product from Evotor API
    console.log(response);
    
    if (req.params.pid === "from_evo") {
      //Сквозной вывод результата из облака Эвотор
      res.send(response);
      return;
    }

    let barcodes = [];
    response.items.forEach((item) => {
      if (item.barcodes && item.barcodes.length) {
        item.barcodes.forEach((barcode) => {
          barcodes.push({ id: item.id, barcode });
        });
      }
    });
    await ProductEvo.sync({ force: true });
    await Barcode.sync({ force: true });
    await ProductEvo.bulkCreate(response.items);
    await Barcode.bulkCreate(barcodes);
    if (req.params.pid === "init") {
      await Product.sync({ force: true });
      await Product.bulkCreate(response.items);
    }
    let { count, rows } = await ProductEvo.findAndCountAll({
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ["barcode"],
      },
    });

    rows.map((p) => {
      p.setBarcodes(
        p.Barcodes.map((b) => {
          return b.barcode;
        })
      );
      delete p.dataValues.Barcodes;
      return p;
    });
    res.send({ count, items: rows });
  } else if (req.params.value === "barcode") {
    if (!req.params.pid) {
      res.send({ error: "nothing search!!!" });
      return;
    }
    let whereP; // Generate Query string
    if (+req.params.pid === 0 || req.params.pid === "null") {
      whereP = { barcode: { [Op.is]: null } };
    } else {
      whereP = { barcode: req.params.pid };
    }
    let result = {};
    result.items = await Product.findAll({
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ["barcode"],
        where: whereP,
      },
    });
    res.send(result);
  } else {
    // Find by Primary Key
    let product = await Product.findByPk(req.params.value);
    if (!product) {
      res.json({ error: "Primary key not found!" });
      return;
    }
    let barcodes = await Barcode.findAll({ where: { id: req.params.value } });
    barcodes = barcodes.map((item) => {
      return item.barcode;
    });
    product.setBarcodes(barcodes);
    res.json(product);
  }
};
