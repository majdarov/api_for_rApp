import * as axios from 'axios';
import apiConfig from './apiConfig.json';

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
  async getGroupsEvo() {
    return await apiProducts.get('/groups/update/from_evo');
  }
}
