import { GET_DOCTORS_FAIL, GET_DOCTORS_REQUEST, GET_DOCTORS_SUCCESS, GET_DOCTOR_FAIL, GET_DOCTOR_REQUEST, GET_DOCTOR_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../Constants/UserConstants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getDoctorsReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case GET_DOCTORS_REQUEST:
      return { ...state, loading: true };
    case GET_DOCTORS_SUCCESS:
      return { loading: false, doctors: action.payload };
    case GET_DOCTORS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getDoctorReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case GET_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case GET_DOCTOR_SUCCESS:
      return { loading: false, doctor: action.payload };
    case GET_DOCTOR_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};