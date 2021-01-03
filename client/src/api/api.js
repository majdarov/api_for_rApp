import * as axios from 'axios';
import apiConfig from './apiConfig.json';
import { createRequest, fetchEvo } from './api_evotor';

/* Раскомментировать для сборки for create 'build' */
// const apiSamurai = axios.create({
//   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//   withCredentials: true,
//   headers: {
//     'API-KEY': '1204f868-84dd-4ccb-ad64-0310201501d1',
//   },
// });
// const apiProducts = axios.create({
//   baseURL: '/api/v2'
// });

const apiSamurai = axios.create(apiConfig.apiSamurai);
const apiProducts = axios.create(apiConfig.apiProducts);

export const usersApi = {
  getAuth() {
    return apiSamurai
      .get('auth/me')
      .then((res) => res.data)
      .catch((e) => e.message);
  },
};

export const productsApi = {
  async getData(path, query) {
    return await apiProducts
      .get(path, { params: query })
      .then((res) => res.data);
  },
  async postData(path, body) {
    return await apiProducts.post(path, body);
  },
  async putData(path, data) {
    return await apiProducts.put(path, data);
  },
  async deleteData(path) {
    return await apiProducts.delete(path);
  },
};

export const apiForIdb = {

  async getStores() {
    let request = await createRequest({ type: 'store_v2' });
    let stores = await fetchEvo(request);
    return stores.items;
  },

  async getGroupsEvo() {
    let request = await createRequest({ type: 'groups_v2' });
    return await fetchEvo(request);
  },

  async getProductsEvo() {
    let request = await createRequest({ type: 'products_v2' });
    return await fetchEvo(request);
  },

  async postData(path, body) {
    let request = await createRequest({ type: `post_${path}_v2`, body });
    return await fetchEvo(request);
  },
  async putData(path, body) {
    let request = await createRequest({ type: `put_${path}_v2`, body });
    return await fetchEvo(request);
  },
  async deleteData(path, id) {
    let request = await createRequest({ type: `delete_${path}_v2`, id });
    return await fetchEvo(request);
  },
};
