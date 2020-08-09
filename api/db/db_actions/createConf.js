module.exports = function (/* appToken */) {
  let appToken = "6ef2370f-ed79-43b7-8a7c-f7b83175fef2";

  const createConfig = `CREATE TABLE IF NOT EXISTS config_store (
        config_name TEXT UNIQUE NOT NULL,
        config_value TEXT NOT NULL
    );`;

  const addTokenInConfig = `INSERT INTO config_store (config_name, config_value)
    VALUES ("app_token", "${appToken}"), ("store_id", "not_set");`;

  const arrSql = [createConfig, addTokenInConfig];

  return arrSql;
}
