import { apiForIdb, productsApi } from '../api/api';
import { getGroup, getProduct, getProductsPid, putData } from '../api/apiIDB';
import { chooseError } from '../components/Errors/chooseError';

const GET_GROUPS = 'GET-GROUPS';
const SET_PID = 'SET-PID';
const GET_COMMODITIES = 'GET-COMMODITIES';
const SET_ERROR = 'SET-ERROR';
const UPDATE_COMMODITY = 'UPDATE-COMMODITY';
const SET_UPDATED = 'SET-UPDATED';
const VIEW_FORM = 'VIEW-FORM';
const SET_FORM_DATA = 'SET-FORM-DATA';
const TOGGLE_FORM_POST = 'TOGGLE-FORM-POST';
const SET_FORM_ERROR = 'SET-FORM-ERROR';
const SET_APP_KEY = 'SET-APP-KEY';

export const getGroupsAC = (groups) => {
  return { type: GET_GROUPS, groups };
};

export const setPidAC = (pid) => {
  return { type: SET_PID, pid: pid };
};

export const getCommoditiesAC = (commodities) => {
  return { type: GET_COMMODITIES, commodities };
};

export const setErrorAC = (error) => {
  return { type: SET_ERROR, error };
};

export const setFormErrorAC = (error) => {
  return { type: SET_FORM_ERROR, error };
};

export const updateCommodityAC = () => {
  return { type: UPDATE_COMMODITY };
};

export const setUpdatedAC = (update) => {
  return { type: SET_UPDATED, update };
};

export const viewFormAC = (view) => {
  return { type: VIEW_FORM, viewForm: view };
};

export const setFormDataAC = (formData) => {
  formData = formData === null ? initialState.form.formData : formData;
  return { type: SET_FORM_DATA, formData };
};

export const toggleFormPostAC = (formPost) => {
  return { type: TOGGLE_FORM_POST, formPost };
};

export const setAppKeyAC = (key) => {
  return { type: SET_APP_KEY, key };
};

let initialState = {
  groups: [],
  commodities: [],
  pid: null,
  isLoaded: false,
  comIsLoaded: false,
  error: null,
  lastUpdate: 1585166400000,
  isUpdated: false,
  viewForm: false,
  form: {
    formData: {
      id: null,
      name: '',
      code: '',
      measure_name: 'шт',
      tax: 'NO_VAT',
      allow_to_sell: true,
      description: '',
      article_number: '',
      // parent_id: null,
      type: 'NORMAL',
      price: 0,
      cost_price: 0,
      quantity: 0,
      photos: [],
      barcodes: [],
    },
    formPost: false,
    resMessage: null,
    formError: null,
  },
};

const commodityReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      let groups = [];
      action.groups.forEach((item) => {
        let group = {
          id: item.id,
          pid: item.parent_id ? item.parent_id : null,
          label: item.name,
          // code: Date.parse(item.createdAt)
        };
        groups.push(group);
      });
      // groups.sort((a,b) => a.code - b.code);
      return { ...state, groups: groups, isLoaded: true };

    case SET_PID:
      return Object.assign({}, state, {
        pid: action.pid,
        comIsLoaded: false,
      });

    case GET_COMMODITIES:
      let commodities = [];
      action.commodities.forEach((item) => {
        // if (item.g) return;
        let commodity = {
          uuid: item.id,
          code: item.code,
          label: item.name,
          price: item.price,
        };
        commodities.push(commodity);
      });
      return Object.assign({}, state, {
        commodities: commodities,
        comIsLoaded: true,
      });

    case SET_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });

    case SET_FORM_ERROR:
      return { ...state, form: { ...state.form, formError: action.error } };

    case UPDATE_COMMODITY:
      let lastUpdate = Date.now();
      if (!state.updateOk) {
        lastUpdate = state.lastUpdate;
      } else {
        lastUpdate = Date.now();
      }
      return { ...state, lastUpdate };

    case SET_UPDATED:
      return { ...state, isUpdated: action.update };

    case VIEW_FORM:
      return { ...state, viewForm: action.viewForm };

    case TOGGLE_FORM_POST:
      return { ...state, form: { ...state.form, formPost: action.formPost } };

    case SET_FORM_DATA:
      return { ...state, form: { ...state.form, formData: action.formData } };

    default:
      return state;
  }
};

export const getProducts = (pId) => {
  return (dispatch) => {
    getProductsPid(pId)
      .then((res) => dispatch(getCommoditiesAC(res)));
  };
};

export const getProductId = (id) => {
  if (!id) return (dispatch) => dispatch(viewFormAC(true));
  return (dispatch) => {
    productsApi
      .getData(`products/${id}`)
      .then((res) => {
        dispatch(setFormDataAC(res));
        return true;
      })
      .then((result) => {
        if (result) dispatch(viewFormAC(true));
      });
  };
};

export const getGroups = () => {
  return (dispatch) => {
    getGroup('all').then((res) => {
      // console.log(res)
      let groups = res.map((item) => {
        return {
          ...item,
          pid: item.parent_id ? item.parent_id : null,
          label: item.name,
        };
      });
      dispatch(getGroupsAC(groups));
    });
  };
};

export const updateProducts = (pId) => {
  return (dispatch) => {
    productsApi.getData('products/update').then((res) => {
      dispatch(updateCommodityAC());
      dispatch(setUpdatedAC(false));
      alert(`Updated at ${Date()}`);
      dispatch(setPidAC(pId || 0));
    });
  };
};

export const setUpdated = (updated) => (dispatch) =>
  dispatch(setUpdatedAC(updated));

export const setViewForm = (view) => (dispatch) => dispatch(viewFormAC(view));

export const setFormData = (formData) => (dispatch) => {
  formData = formData ? formData : initialState.form.formData;
  dispatch(setFormDataAC(formData));
};

export const postFormData = (typeData, typeQuery, body) => (dispatch) => {
  // debugger
  let path;
  switch (typeData) {
    case 'product':
      path = 'product';
      break;
    case 'group':
      path = 'group';
      break;
    default:
      path = 'product';
      break;
  }
  let callbackApi;
  switch (typeQuery) {
    case 'post':
      callbackApi = apiForIdb.postData;
      break;
    case 'put':
      path += `/${body.id}`;
      callbackApi = apiForIdb.putData;
      break;
    default:
      callbackApi = apiForIdb.postData;
      break;
  }
  // console.log('method: ' + typeQuery);
  callbackApi(path, body)
    .then(res => {
      putData(`${path}s`, res.data);
      return res.data;
    })
    .then((res) => {
      console.log(res);
      return res.product.parent_id;
    })
    .then((pid) => {
      dispatch(toggleFormPostAC(false));
      dispatch(viewFormAC(false));
      dispatch(setFormDataAC(initialState.form.formData));
      dispatch(setPidAC(pid || 0));
    })
    .catch((err) => {
      console.dir(err);
      dispatch(setFormErrorAC(chooseError(err)));
      dispatch(toggleFormPostAC(false));
    });
};

export const deleteProduct = (id, pid) => (dispatch) => {
  return productsApi
    .deleteData(`products/${id}`)
    .then((res) => {
      dispatch(setPidAC(pid));
      return res.data;
    })
    .catch((err) => {
      console.dir(err);
      dispatch(setErrorAC(chooseError(err)));
    });
};

export default commodityReduser;
