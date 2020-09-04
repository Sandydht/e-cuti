// Types
import { SET_DATA_PNS, SET_DETAIL_PNS, SET_LOADING } from "../types";

const initialState = {
  dataPNS: [],
  detailPNS: {},
  isLoading: false
};

const pnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_DATA_PNS:
      return {
        ...state,
        isLoading: false,
        dataPNS: action.payload
      };
    case SET_DETAIL_PNS:
      return {
        ...state,
        isLoading: false,
        detailPNS: action.payload
      };
    default:
      return state;
  }
};

export default pnsReducer;