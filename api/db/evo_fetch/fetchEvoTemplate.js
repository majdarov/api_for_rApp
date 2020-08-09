const products_v1 = {
  server: "https://api.evotor.ru/api/v1/inventories/",
  path: "stores/20180608-EEA0-408D-807D-6AB73272E383/products/schemes",
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

const stores_v1 = {
  server: "https://api.evotor.ru/api/v1/inventories/",
  path: "stores/search",
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

const employees_v1 = {
  server: "https://api.evotor.ru/api/v1/inventories",
  path: "/employees/search",
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

const products_v2 = {
  server: "https://api.evotor.ru/",
  path: "stores/20180608-EEA0-408D-807D-6AB73272E383/products",
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

const put_product_v2 = {
  server: "https://api.evotor.ru/",
  path: "stores/20180608-EEA0-408D-807D-6AB73272E383/products",
  method: "PUT",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
  body: "",
};

const groups_v2 = {
  server: "https://api.evotor.ru/",
  path: "stores/20180608-EEA0-408D-807D-6AB73272E383/product-groups",
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

const stores_v2 = {
  server: "https://api.evotor.ru/",
  path: "stores",
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

const documents_v2 = {
  server: "https://api.evotor.ru/",
  path: `stores/20180608-EEA0-408D-807D-6AB73272E383/documents`,
  method: "GET",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

// const api_v2 = {
  // server: "https://api.evotor.ru/",
  // path: "stores/20180608-EEA0-408D-807D-6AB73272E383/",
  // headers: {
    // Accept: "application/vnd.evotor.v2+json",
    // "Content-Type": "application/vnd.evotor.v2+json",
    // "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  // },
// };

async function getStoreEvo({ server, headers, path, method, body }) {
  let stores;
  let groups = [];
  // console.log(path);
  let response = await fetch(server + path, {
    method,
    headers,
    body
  });
  let result = await response.json();
  // https://api.evotor.ru/stores/20180608-EEA0-408D-807D-6AB73272E383/documents?cursor=string
  console.log(result);
  return result;
}
