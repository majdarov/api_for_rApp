const express = require('express');
const router = express.Router();
const initDb = require('../api/db/initial_db');
const {
  createConfig,
  getDoks,
  setStore,
  addStoreInConfig,
} = require('../api/db/db_actions');
const { createRequest, fetchEvo } = require('../api/v2/api_evotor');
// const v1 = require('../api/v1/evo');
const v2 = require('../api/v2/evo');
// var cors = require('cors');
const Config = require('../api/models/config');

router.get('/', (req, res) => {
  res.redirect('/api/docs');
});

router.get('/docs', async function (req, res) {
  try {
    // let config = await initDb([getConfig]);
    let config = await Config.findAll();
    if (!config.length) {
      let arrSql = createConfig();
      await initDb(arrSql).catch((e) => console.log(e.message));
    }
    let result = await initDb(getDoks);
    let doks = [];
    result.items.forEach((item) => {
      if (!doks.length || !doks.find((dok) => dok.dl === item.dl)) {
        doks.push({ dl: item.dl, dts: { [item.dt]: item.dd } });
      } else {
        let el = doks.find((dok) => dok.dl === item.dl);
        el.dts[item.dt] = item.dd;
      }
    });
    res.send({config, doks});
  } catch (e) {
    console.error(e.message);
  }
});
router.get('/config/:update?/:storeId?', async function (req, res) {
  if (req.params.update === 'stores') {
    if (!req.params.storeId) {
      let request = await createRequest({ type: 'store_v2' });
      let result = await fetchEvo(request);
      let strSQL = setStore(result.items);
      await initDb(strSQL);
      res.send(result);
    } else {
      let result = await initDb(addStoreInConfig(req.params.storeId));
      res.send(result);
    }
  } else {
    let config = await Config.findAll();
    res.json(config);
  }
});
router.use('/v2',v2);

module.exports = router;
