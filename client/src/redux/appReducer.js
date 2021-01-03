const SET_APP_KEY = 'SET-APP-KEY';
const SET_STORE_KEY = 'SET-STORE-KEY';
const INIT_APP = 'INIT-APP';
const SET_STORES = 'SET-STORES';

export const setAppKeyAC = (key) => {
  return { type: SET_APP_KEY, key };
};

export const setStoreKeyAC = (key) => {
  return { type: SET_STORE_KEY, key };
};

export const initAppAC = (init) => {
  return { type: INIT_APP, init };
};

export const setStoresAC = (stores) => {
  return { type: SET_STORES, stores };
};

const initialState = {
  appKey: null,
  storeKey: null,
  isInit: false,
  stores: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_KEY:
      return { ...state, appKey: action.key };
    case SET_STORE_KEY:
      return { ...state, storeKey: action.key };
    case INIT_APP:
      return { ...state, isInit: action.init };
    case SET_STORES:
      return { ...state, stores: [...action.stores] };
    default:
      return state;
  }
};

export const setAppKey = (key) => (dispatch) => {
  return dispatch(setAppKeyAC(key));
};

export const setStoreKey = (key) => (dispatch) => {
  return dispatch(setStoreKeyAC(key));
};

export const initApp = (init) => (dispatch) => {
  return dispatch(initAppAC(init));
};

export const setStores = (stores) => (dispatch) => {
  return dispatch(setStoresAC(stores));
};

export const initializeApp = () => (dispatch) => {
  if (localStorage.appKey) {
    dispatch(setAppKeyAC(localStorage.appKey));
    if (localStorage.storeKey) {
      dispatch(setStoreKeyAC(localStorage.storeKey));
    }
  }
};

export default appReducer;
