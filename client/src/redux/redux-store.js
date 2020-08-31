import { createStore, combineReducers, applyMiddleware } from 'redux';
import navReduser from './navReduser';
import commodityReduser from './commodityReduser';
import muzReduser from './MuzikReduser';
import authReduser from './auth_reduser';
import thunkMidleware from 'redux-thunk';

let redusers = combineReducers({
  navigation: navReduser,
  commodityPage: commodityReduser,
  muzik: muzReduser,
  auth: authReduser,
});

let store = createStore(redusers, applyMiddleware(thunkMidleware));

export default store;
