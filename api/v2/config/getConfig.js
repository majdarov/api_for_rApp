const Config = require('../../models/config');

module.exports = async function(req, res) {
    let config = await Config.findAll();
    res.send(config);
}