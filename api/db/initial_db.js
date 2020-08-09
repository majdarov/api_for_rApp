const sqlite3 = require("sqlite3").verbose();

module.exports = async function (callback, ...args) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database("./api/db/api.db", (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to ./api/db/api.db");
    });

    let attachDb = "./api/db/products.db";

    db.run(`ATTACH DATABASE "${attachDb}" AS products`, function (err) {
      if (err) {
        console.error(err.message);
      }
      console.log(`Attached to ${attachDb}`);
    });

    let result = [];
    let status;
    let statementSql;

    if (callback) {
      if (typeof callback === "function") {
        try {
          callback(db, result, args);
          status = { result: "ok" };
        } catch (err) {
          status = { result: "ERROR: " + err.message };
        }
      } else if (typeof callback === "string") {
        try {
          db.run(callback, function (err) {
            if (err) {
              console.log(err.message);
              return err;
            }
            statementSql = Object.assign({}, this);
          });
          status = { result: "ok" };
        } catch (err) {
          status = { result: "ERROR: " + err.message };
        }
      } else if (callback instanceof Array) {
        try {
          db.serialize(() => {
            callback.forEach((item) => {
              if (typeof item === "string") {
                db.run(item, function (err) {
                  if (err) {
                    console.log(err);
                    status = { error: err.message };
                    return err;
                  }
                  statementSql = Object.assign({}, this);
                });
              } else if (typeof item === "function") {
                item(db, result, args);
              }
            });
          });
          status = { result: "ok" };
        } catch (err) {
          status = { result: "ERROR: " + err.message };
        }
      }
    }

    db.close((err) => {
      if (err) {
        reject(err.message);
      }
      // console.log("from initDb: " + result);
      console.log("Disconnect database");
      resolve({ status, items: result, statementSql });
    });
  });
};
