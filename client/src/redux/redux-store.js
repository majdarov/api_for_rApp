import { createStore, combineReducers, applyMiddleware } from 'redux';
import navReduser from './navReduser';
import commodityReduser from './commodityReduser';
import muzReduser from './MuzikReduser';
import authReduser from './auth_reduser';
import thunkMidleware from 'redux-thunk';
import appReducer from './appReducer';

let redusers = combineReducers({
  navigation: navReduser,
  commodityPage: commodityReduser,
  muzik: muzReduser,
  auth: authReduser,
  app: appReducer
});

let store = createStore(redusers, applyMiddleware(thunkMidleware));

export default store;
