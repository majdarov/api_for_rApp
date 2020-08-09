module.exports = function (db, result, args = []) {
  if (!args[0]) {
    strWhere = "";
  } else {
    strWhere = " WHERE";
    Object.entries(args[0]).forEach((arg) => {
      if (arg[1] === "='0'" || arg[1] === "='null'" || arg[1] === "" || arg[1] === '0' || arg[1] === 'null') {
        strWhere += ` ${arg[0]} IS NULL AND`;
      } else {
        strWhere += ` ${arg[0]} ${arg[1]} AND`;
      }
    });
    strWhere = strWhere.slice(0, strWhere.length - 4) + ";";
    strWhere = strWhere.replace(/\*/g, '%');
  }
  db.each(`SELECT * FROM products${strWhere}`, (err, row) => {
    if (err) {
      console.log(err.message);
      return err;
    }
    result.push(row);
  });
  return result;
};
