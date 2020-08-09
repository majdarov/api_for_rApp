const Group = require("../../models/group");

module.exports = async function (req, res) {
    let group = await Group.create(req.body);
    // let groups = await Group.findAll();
    res.json(group);
  };
