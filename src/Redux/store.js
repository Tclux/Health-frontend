import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getDoctorReducer, getDoctorsReducer, loginReducer, userDetailsReducer, userRegisterReducer, userUpdateReducer } from "./Reducers/UserReducer";

const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  allDoctors: getDoctorsReducer,
  singleDoctors: getDoctorReducer,
});
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



const innitialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,

  },

};
const Middleware = [thunk];
const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
