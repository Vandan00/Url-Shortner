import axios from "axios";
import {
  URLS_LIST_FAIL,
  URLS_LIST_REQUEST,
  URLS_LIST_SUCCESS,
} from "../constants/urlConstants";

export const listUrls = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: URLS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`api/urls`, config);

    dispatch({
      type: URLS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: URLS_LIST_FAIL,
      payload: message,
    });
  }
};
