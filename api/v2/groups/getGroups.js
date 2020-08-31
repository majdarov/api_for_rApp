const parseQuery = require("../../models/parse_query");
const Group = require("../../models/group");
const { createRequestAxios, fetchEvoAxios } = require("../api_evotor");

module.exports = async function (req, res) {
    if (!req.params.value) {
      let where = parseQuery(req.query);
      let { count, rows } = await Group.findAndCountAll({
        where,
        // order: [['createdAt', 'ASC']]
      });
      let groups = {count, items: rows, query: req.query};
      res.json(groups);
    } else if (req.params.value === 'update') {
      let request = await createRequestAxios({ type: 'groups_v2' });
      let result = await fetchEvoAxios(request);
      if (req.params.gid === 'from_evo') { //Сквозной вывод результата из облака Эвотор
        res.send(result);
        return;
      }
      await Group.sync({ force: true });
      let groups = await Group.bulkCreate(result.items);
      res.json(groups);
    } else {
      let group = await Group.findByPk(req.params.value);
      if (group !== null) {
        res.json(group);
      } else {
        res.json({ error: 'Primary Key not found' });
      }
    }
  };
