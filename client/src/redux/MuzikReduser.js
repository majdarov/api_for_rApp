const SET_TEXT = "SET-TEXT";

export const setMuzikTextAC = text => ({ type: SET_TEXT, text: text });

let initialState = {
  textHTML: "text HTML..."
};

const muzReduser = (state = initialState, action) => {
  switch (action.type) {

    case SET_TEXT:
      return Object.assign({}, state, {textHTML: action.text});

    default:
      return state;
  }
};

export default muzReduser;
