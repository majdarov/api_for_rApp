import Commodity from "./Commodity";
import { setPidAC, getGroups, getProducts, 
  setViewForm, getProductId, deleteProduct,setFormData, 
  toggleFormPostAC, postFormData, setFormErrorAC, setErrorAC } from "../../redux/commodityReduser";
import { connect } from "react-redux";
import { compose } from "redux";

const mapState = state => {
  state = state.commodityPage;
  return {
    isLoaded: state.isLoaded,
    groups: state.groups,
    price: "Price",
    pid: state.pid,
    commodities: state.commodities,
    comIsLoaded: state.comIsLoaded,
    error: state.error,
    viewForm: state.viewForm,
    formData: state.form.formData,
    formPost: state.form.formPost,
    formError: state.form.formError
  };
};

const setPid = (pId) => {
  return (dispatch) => {
    dispatch(setPidAC(pId));
  };
};

const toggleFormPost = formPost => {
  return dispatch => dispatch(toggleFormPostAC(formPost));
}

const setFormError = err => {
  return dispatch => dispatch(setFormErrorAC(err));
}

const setError = err => {
  return dispatch => dispatch(setErrorAC(err));
}

export default compose(
  connect(mapState, {
  getGroups,
  getProducts,
  setPid,
  setViewForm,
  getProductId,
  deleteProduct,
  setFormData,
  toggleFormPost,
  postFormData,
  setFormError,
  setError
})
)(Commodity);
