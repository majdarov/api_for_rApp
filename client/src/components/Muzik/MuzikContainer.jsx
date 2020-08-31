import { connect } from "react-redux";
import Muzik from "./Muzik";
import { setMuzikTextAC } from "../../redux/MuzikReduser";

const mapStateToProps = state => {
  
  return {
    title: state.navigation._title,
    textHTML: state.muzik.textHTML
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeText: e => {
      let txt = e.target.value;
      dispatch(setMuzikTextAC(txt));
    }
  }
}

const MuzikContainer = connect(
  mapStateToProps,
  mapDispatchToProps)(Muzik)

export default MuzikContainer;
