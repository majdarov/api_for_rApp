module.exports = function(id) {
    let strSQL = `UPDATE config_store 
        SET config_value = '${id}'
        WHERE config_name = 'store_id'`;
    return strSQL;
}