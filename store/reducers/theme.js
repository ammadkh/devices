import {TOGGLE_THEME} from '../actions/theme';

const init = {
  appTheme: 'light',
};

const themeReducer = (state = init, action) => {
  console.log('mode reducer..');
  switch (action.type) {
    case TOGGLE_THEME:
      const mode = state.appTheme === 'light' ? 'dark' : 'light';
      return {...state, appTheme: mode};
    default:
      return state;
  }
};

export default themeReducer;
