const express = require('express');
const router = express.Router();
const { createRequestAxios, fetchEvoAxios } = require('./api_evotor');
const Group = require('../models/group');
const Product = require('../models/product');
const { Op } = require('sequelize');
const parseQuery = require('../models/parse_query');
const { getGroups, postGroup } = require('./groups');
const { getProducts, postProduct } = require('./products');
const { getConfig } = require('./config');
const deleteProducts = require('./products/deleteProducts');
const putProduct = require('./products/putProduct');
require('../models/relations');

/* GET home page. */
router.get('/', async (req, res) => {
  res.json({ api_version: 2 });
});

router.get('/request/:action?', async (req, res) => {
  let request = '';
  let body = [];
  let cursor;
  if (req.query && req.query.cursor) {
    cursor = req.query.cursor;
  } else {
    body = req.query.body;
  }
  if (req.params.action) {
    request = await createRequestAxios({
      type: req.params.action,
      body,
      cursor,
    });
  }
  res.json({ api_version: 2, request, query: req.query });
});

router.get('/seq/:destroy?', async (req, res) => {
  if (!req.params.destroy) {
    if (!req.query) {
      res.send('no query!');
    }
    let query = parseQuery(req.query);
    console.log(query);
    let result = {};
    result.items = await Product.findAll({ where: query });
    result.query = req.query;
    res.send(result);
  }
  if (req.params.destroy === 'remove') {
    await Group.destroy({
      where: {
        name: {
          [Op.like]: [`%${req.query.name}%`],
        },
      },
    });
    let groups = await Group.findAndCountAll();
    res.json(groups);
  } else if (req.params.destroy === 'create') {
    let group = { name: req.query.name };
    console.log(JSON.stringify(group));
    try {
      let response = await fetchEvoAxios({
        baseURL: '/api',
        url: '/v2/groups',
        method: 'post',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(group),
      });
      // let json = await response.json();
      res.send(response);
    } catch (err) {
      res.send(err);
    }
  } else if (req.params.destroy === 'test') {
    /* let where = {
      name: {
        [Op.or]: [{ [Op.like]: '%корм%' }, { [Op.like]: '%Корм%' }],
      },
    };
    const qs = require('qs');
    let test = {
      name: {
        or: [{ like: 'корм' }, { like: 'Корм' }],
      },
    };
    let str = qs.stringify(test, { encode: false });
    console.log(str);
    let { count, rows } = await Product.findAndCountAll({ where });
    res.send({ count, rows, str }); */
    res.end('test');
  }
});

router.get('/test', (req, res) => {
  res.send({query: req.query})
});
router.post('/test', (req, res) => {
  res.send({body: req.body, query: req.query})
});
router.put('/test', (req, res) => {
  res.send({body: req.body, query: req.query})
});

router.get('/config', getConfig);

router.get('/groups/:value?/:gid?', getGroups).post('/groups', postGroup);

router
  .get('/products/:value?/:pid?', getProducts)
  .post('/products', postProduct)
  .put('/products/:id', putProduct)
  .delete('/products/:id', deleteProducts)

router.get('/documents/:value?', async function (req, res) {
  if (!req.params.value) {
    res.json({ db: 'documents' });
  } else if (req.params.value === 'update') {
    try {
      let request = await createRequestAxios({ type: 'documents_v2' });
      let result = await fetchEvoAxios(request);
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    try {
      let request = await createRequestAxios({
        type: 'documents_v2',
        value: req.params.value,
      });
      let result = await fetchEvoAxios(request);
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  }
});

module.exports = router;
