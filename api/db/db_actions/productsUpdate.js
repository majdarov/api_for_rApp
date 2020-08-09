module.exports = function (products) {
  
  const dropTable = 'DROP TABLE IF EXISTS products.products';

  const createTable =
    `CREATE TABLE IF NOT EXISTS products.products (
    "id" TEXT UNIQUE,
    "name" TEXT NOT NULL,
    "code" INTEGER,
    "measure_name" TEXT,
    "tax" TEXT NOT NULL DEFAULT "NO_VAT",
    "allow_to_sell" BOOLEAN DEFAULT true,
    "description" TEXT,
    "article_number" TEXT,
    "parent_id" TEXT DEFAULT NULL,
    "type" TEXT DEFAULT "NORMAL",
    "price" NUMERIC,
    "cost_price" NUMERIC,
    "quantity" NUMERIC,
    "barcodes" TEXT,
    "photo" TEXT,
    PRIMARY KEY ("id") )`;

  let fields = [
    "id",
    "name",
    "code",
    "measure_name",
    "tax",
    "allow_to_sell",
    "description",
    "article_number",
    "parent_id",
    "type",
    "price",
    "cost_price",
    "quantity",
    "barcodes"
  ];
  let insertValues = `INSERT INTO products ( ${fields.join(", ")} ) VALUES `;

  products.forEach((product) => {
    let values = [];
    fields.forEach((fld) => {
      let value = product[fld] ? `'${product[fld]}'` : 'null';
      value = value.replace(/\p{Letter}'\p{Letter}/gu, match => match.replace(/'/, '`')).replace(/(?!^)'(?!$)/g, '"');
      values.push(value);
    });
    insertValues += `( ${values.join(",")} ),`;
  });
  
  insertValues = insertValues.slice(0, insertValues.length - 1);
  
  return [dropTable, createTable, insertValues];
}
