const parseQuery = require('../../models/parse_query');
const Product = require('../../models/product');
const { createRequestAxios, fetchEvoAxios } = require('../api_evotor');
const Barcode = require('../../models/barcode');
const Photo = require('../../models/photo');
const { Op } = require('sequelize');

const setArr = (product, name) => {
  let arr = name.split('');
  arr.splice(0, 1, arr[0].toUpperCase());
  product.setDataValue(
    name + 's',
    product[arr.join('') + 's'].map((item) => {
      return item[name];
    }),
  );
  delete product.dataValues[arr.join('') + 's'];
};

module.exports = async function (req, res) {
  if (!req.params.value) {
    if (req.query.max) {
      let maxValue = await Product.max(req.query.max);
      res.json(maxValue);
      return;
    }
    let where = parseQuery(req.query);
    let { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Barcode,
          // as: 'barcodes',
          attributes: ['barcode'],
        },
        {
          model: Photo,
          // as: 'photos',
          attributes: ['photo'],
        },
      ],
      order: [['name', 'ASC']],
    });

    rows.map((p) => {
      setArr(p, 'barcode');
      setArr(p, 'photo');
      return p;
    });

    let result = { count, items: rows, query: req.query };
    res.send(result);
  } else if (req.params.value === 'update') {
    let request = await createRequestAxios({ type: 'products_v2' });
    // console.log(request)
    let response = await fetchEvoAxios(request); // Get Product from Evotor API
    // console.log(response);

    if (req.params.pid === 'from_evo') {
      //Сквозной вывод результата из облака Эвотор
      res.send(response);
      return;
    }
    let data = response;
    let barcodes = [];
    data.items.forEach((item) => {
      if (item.barcodes && item.barcodes.length) {
        item.barcodes.forEach((barcode) => {
          barcodes.push({ id: item.id, barcode });
        });
      }
    });
    await Product.sync({force: true});
    await Barcode.sync({force: true});
    await Product.bulkCreate(data.items);
    await Barcode.bulkCreate(barcodes);
    // if (req.params.pid === 'init') {
    //   await Product.sync({ force: true });
    //   await Product.bulkCreate(response.items);
    // }
    let { count, rows } = await Product.findAndCountAll({
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ['barcode'],
      },
    });

    rows.map((p) => {
      p.setBarcodes(
        p.Barcodes.map((b) => {
          return b.barcode;
        }),
      );
      delete p.dataValues.Barcodes;
      return p;
    });
    res.send({ count, items: rows });
  } else if (req.params.value === 'barcode') {
    if (!req.params.pid) {
      res.send({ error: 'nothing search!!!' });
      return;
    }
    let whereP; // Generate Query string
    if (+req.params.pid === 0 || req.params.pid === 'null') {
      whereP = { barcode:
        {
          [Op.is]: null
        }
      };
    } else {
      whereP = { barcode: req.params.pid };
    }
    let result = {};
    result.items = await Product.findAll({
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ['barcode'],
        where: whereP,
      },
    });
    res.send(result);
  } else {
    // Find by Primary Key
    let product = await Product.findByPk(req.params.value, {
      include: [
        {
          model: Barcode,
          attributes: ['barcode'],
        },
        {
          model: Photo,
          // as: 'photos',
          attributes: ['photo'],
        },
      ],
    });
    if (!product) {
      res.json({ error: 'Primary key not found!' });
      return;
    }

    setArr(product, 'barcode');
    setArr(product, 'photo');

    res.json(product);
  }
};
