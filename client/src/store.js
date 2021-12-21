import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  //   userUpdateReducer,
} from "./reducers/userReducers";

import { urlListReducer } from "./reducers/urlReducers";

const reducer = combineReducers({
  urlList: urlListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  //   urlCreate: urlCreateReducer,
  //   urlDelete: urlDeleteReducer,
  //   urlUpdate: urlUpdateReducer,
  //   userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
