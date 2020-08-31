const GET_TITLE = 'GET-TITLE';

const CHOOSE_LANG = 'CHOOSE-LANG';

export const getTitleAC = (path) => ({ type: GET_TITLE, path });

export const chooseLangAC = (lng) => ({ type: CHOOSE_LANG, lng });

let initialState = {
  langs: { ru: 0, en: 1 },
  currentLang: 0,
  title: '',
  navBar: [
    { link: '/', title: ['Начало', 'Start'] },
    { link: '/muzik', title: ['Музыка', 'Music'] },
    { link: '/commodity', title: ['Товары', 'Products'] },
    { link: '/game', title: ['Играть', 'Game'] },
    { link: '/table', title: ['Экспорт Excel', 'Export Excel'] },
  ],
};

const navReduser = (state = initialState, action) => {
  switch (action.type) {

    case GET_TITLE:
      let title;
      let nav = state.navBar.find((item) => item.link === action.path);
      if (nav !== undefined) {
        title = nav.title[state.currentLang];
      }
      return { ...state, title };

    case CHOOSE_LANG:
      return { ...state, currentLang: state.langs[action.lng] };

    default:
      return state;
  }
};

export const getTitle = (path) => {
  return (dispatch) => {
    dispatch(getTitleAC(path));
  };
};

export const chooseLang = lng => {
  return dispatch => {
    dispatch(chooseLangAC(lng))
  };
}

export default navReduser;
