import api_v2 from './api_v2_axios.json';

async function createRequest(action, appKey, storeKey = null) {
  //Getting config => appToken & storeUUID

  api_v2.headers['X-Authorization'] = appKey; //6ef2370f-ed79-43b7-8a7c-f7b83175fef2

  action.storeUuid = storeKey;

  api_v2.params = action.cursor ? { cursor: action.cursor } : null;

  let request = selectOption(action);

  return { ...request, action: action.type };
}

function selectOption(action) {
  let url, method, body, headers;

  switch (action.type) {
    case 'store_v2':
      url = 'stores';
      return { ...api_v2, method: 'GET', url };

    case 'bulks_v1':
      if (action.value) {
        url = 'bulks/' + action.value;
      } else {
        url = 'bulks';
      }
      return { ...api_v2, method: 'GET', url };

    /* Получить товар по ID или все товары */
    case 'products_v2':
      method = 'GET';
      url = 'stores/' + action.storeUuid + '/products';
      if (action.value) {
        url += '/' + action.value;
        action.value = '';
      }
      return { ...api_v2, method, url };
    /*-------------------------------------*/

    /* Получить группу по ID или список групп */
    case 'groups_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/product-groups/' + action.value;
        action.value = '';
      } else {
        url = 'stores/' + action.storeUuid + '/product-groups';
      }
      return { ...api_v2, method, url };
    /*--------------------------------------*/

    /* Получить документы (за пред. месяц, продажа) */
    case 'documents_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/documents/' + action.value;
      } else {
        url = 'stores/' + action.storeUuid + '/documents';
        if (!api_v2.cursor) {
          let date = new Date();
          date.setMonth(date.getMonth() - 1);
          url += `?since=${date.getTime()}&type=SELL`;
        }
      }
      return { ...api_v2, method, url };
    /*----------------------------------------------*/

    case 'put_product_v2':
      method = 'PUT';
      url =
        'stores/' + action.storeUuid + '/products/' + action.body.id;
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'post_product_v2':
      method = 'POST';
      url = 'stores/' + action.storeUuid + '/products';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'delete_product_v2':
      method = 'DELETE';
      url = 'stores/' + action.storeUuid + '/products/' + action.id;
      return { ...api_v2, method, url };

    case 'put_array_products_v2':
      if (!action.body || !action.body.length) {
        return {};
      }
      method = 'PUT';
      headers = {
        ...api_v2.headers,
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      };
      url = 'stores/' + action.storeUuid + '/products';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, url, body };

    case 'put_array_groups_v2':
      method = 'PUT';
      headers = {
        ...api_v2.headers,
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      };
      url = 'stores/' + action.storeUuid + '/product-groups';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, url, body };
    default:
      break;
  }
}

export default createRequest;
