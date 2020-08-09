/* let stores = [
  {
    id: "20180608-EEA0-408D-807D-6AB73272E383",
    name: "Мой магазин",
    user_id: "01-000000000910281",
    created_at: "2018-06-08T09:16:34.309+0000",
    updated_at: "2018-06-08T09:16:34.309+0000",
  },
  {
    id: "20180608-copy-408D-807D-6AB73272E383",
    name: "Мой магазин copy",
    user_id: "01-000000000910281",
    created_at: "2018-06-08T09:16:34.309+0000",
    updated_at: "2018-06-08T09:16:34.309+0000",
  },
]; */

function getFields(item) {
  let fields = [];
  for (let key in item) {
    fields.push(key);
  }
  return fields;
}

function createTable(fields) {
  let strSQL = "CREATE TABLE IF NOT EXISTS stores (";
  fields.forEach((fld) => {
    let constraint = "";
    switch (fld) {
      case "id":
        constraint = "PRYMARY KEY UNIQUE NOT NULL";
        break;
      case "name":
        constraint = "NOT NULL";
        break;
      default:
        break;
    }
    strSQL += `${fld} STRING ${constraint}, `;
  });

  strSQL = strSQL.slice(0, strSQL.length - 2) + ");";
  return strSQL;
}

module.exports = function (stores) {
  let item = stores[Math.ceil(stores.length / 2) - 1];
  let fields = getFields(item);
  let strCreateTable = createTable(fields);
  let strInsertTable = "INSERT INTO stores(" + fields.join(",") + ") VALUES ";
  stores.forEach((store) => {
    let strValues = "(";
    for (let key in store) {
      strValues += `"${store[key]}",`;
    }
    strValues = strValues.slice(0, strValues.length - 1);
    strInsertTable += strValues + "),";
  });
  strInsertTable = strInsertTable.slice(0, strInsertTable.length - 1);
//   console.log(strInsertTable);
  return [strCreateTable, strInsertTable];
};
