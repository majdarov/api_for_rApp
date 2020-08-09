const initDb = require("../initial_db");
const { getConfig } = require("../db_actions");
let api_v2 = {
  server: "https://api.evotor.ru/",
  path: "", //stores/20180608-EEA0-408D-807D-6AB73272E383/
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "", //6ef2370f-ed79-43b7-8a7c-f7b83175fef2
  },
  cursor: "",
};

async function createRequest(action) {
  let appToken;

  //Getting appToken
  let response = await initDb(getConfig);
  let app = response.items.find((item) => item.config_name === "app_token");
  appToken = app.config_value;
  let store = response.items.find((item) => item.config_name === "store_id");
  action.storeUuid = store.config_value;

  api_v2.headers["X-Authorization"] = appToken;

  if (action.cursor) {
    api_v2.cursor = action.cursor;
  }

  let request = selectOption(action);
  api_v2.cursor = "";
  return { ...request, action: action.type };
}

function selectOption(action) {
  let path, method, body, headers, storeUuid;

  switch (action.type) {
    case "store_v2":
      path = "stores";
      return Object.assign({}, api_v2, {
        method: "GET",
        path: path,
      });
    case "bulks_v1":
      if (action.value) {
        path = "bulks/" + action.value;
      } else {
        path = "bulks";
      }
      return Object.assign({}, api_v2, {
        method: "GET",
        path: path,
      });
    /* Получить товар по ID или все товары */
    case "products_v2":
      method = "GET";
      if (action.value) {
        path = "stores/" + action.storeUuid + "/products/" + action.value;
        action.value = "";
      } else {
        path = "stores/" + action.storeUuid + "/products";
      }
      return { ...api_v2, method, path };
    /*-------------------------------------*/

    /* Получить группу по ID или список групп */
    case "groups_v2":
      method = "GET";
      if (action.value) {
        path = "stores/" + action.storeUuid + "/product-groups/" + action.value;
        action.value = "";
      } else {
        path = "stores/" + action.storeUuid + "/product-groups";
      }
      return { ...api_v2, method, path };
    /*--------------------------------------*/

    /* Получить документы (за пред. месяц, продажа) */
    case "documents_v2":
      method = "GET";
      if (action.value) {
        path = "stores/" + action.storeUuid + "/documents/" + action.value;
      } else {
        path = "stores/" + action.storeUuid + "/documents";
        if (!api_v2.cursor) {
          let date = new Date();
          date.setMonth(date.getMonth() - 1);
          path += `?since=${date.getTime()}&type=SELL`;
        }
      }
      return { ...api_v2, method, path };
    /*----------------------------------------------*/


    case "put_product_v2":
      method = "PUT";
      path = "store/" + storeUuid + "/products/" + action.product.id;
      body = JSON.stringify(action.product);
      return Object.assign({}, api_v2, { method, path, body });
    case "put_array_product_v2":
      if (!action.products.length) {
        return {};
      }
      method = "PUT";
      headers = Object.assign({}, api_v2.headers, {
        "Content-Type": "application/vnd.evotor.v2+bulk+json",
      });
      path = "store/" + storeUuid + "/products";
      body = JSON.stringify(action.products);
      return Object.assign({}, api_v2, { method, headers, path, body });
    case "put_array_groups_v2":
      method = "PUT";
      headers = Object.assign({}, api_v2.headers, {
        "Content-Type": "application/vnd.evotor.v2+bulk+json",
      });
      path = "store/" + storeUuid + "/product-groups";
      body = JSON.stringify(action.groups);
      return Object.assign({}, api_v2, { method, headers, path, body });
    default:
      break;
  }
}

module.exports = createRequest;
