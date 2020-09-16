import {
  SET_USER,
  SET_LOADING
} from '../type';

const initialState = {
  credentials: {},
  isLoading: false
};

const userReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_USER:
      return {
        isLoading: false,
        ...actions.payload
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default userReducer;