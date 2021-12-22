import {
  URLS_CREATE_FAIL,
  URLS_CREATE_REQUEST,
  URLS_CREATE_SUCCESS,
  URLS_LIST_FAIL,
  URLS_LIST_REQUEST,
  URLS_LIST_SUCCESS,
} from "../constants/urlConstants";

export const urlListReducer = (state = { urls: [] }, action) => {
  switch (action.type) {
    case URLS_LIST_REQUEST:
      return { loading: true };
    case URLS_LIST_SUCCESS:
      return { loading: false, urls: action.payload };
    case URLS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const urlCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case URLS_CREATE_REQUEST:
      return { loading: true };
    case URLS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case URLS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
