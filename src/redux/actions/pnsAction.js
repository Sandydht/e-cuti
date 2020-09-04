// Types
import { SET_DATA_PNS, SET_DETAIL_PNS, SET_LOADING } from "../types";

// Axios
import Axios from "axios";

export const getAllDataPNS = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
  Axios.get("/dataPNS")
    .then(res => {
      dispatch({ type: SET_DATA_PNS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SET_DATA_PNS, payload: [] });
    });
};

export const getDetailPNS = (pnsId) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  Axios.get(`/dataPNS/${pnsId}`)
    .then((res) => {
      dispatch({ type: SET_DETAIL_PNS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SET_DETAIL_PNS, payload: {} });
    });
}; 