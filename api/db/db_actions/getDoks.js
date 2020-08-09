module.exports = function (db, result) {
  db.each("SELECT * FROM api_doks", (err, row) => {
    if (err) {
      console.log(err.message);
      return err;
    }
    result.push(Object.assign({}, row));
  });
  return result;
};
