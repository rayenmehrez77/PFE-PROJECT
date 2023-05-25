import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
} from "../actions/AuthTypes";

export function signupAction(
  name,
  email,
  OLM,
  password,
  confirmPassword,
  history
) {
  return (dispatch) => {
    signUp(name, email, OLM, password, confirmPassword)
      .then((response) => {
        if(response.data.success){
          console.log(response);
          saveTokenInLocalStorage(response.data);
          // runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
          dispatch(confirmedSignupAction(response.data));
          history.push("/dashboard");
        }else{
          const errorMessage = formatError(response.data.message);
        dispatch(signupFailedAction(errorMessage));
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function logout(history) {
  localStorage.clear();
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          saveTokenInLocalStorage(response.data);
          // runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
          dispatch(loginConfirmedAction(response.data));
          history.push("/dashboard");
        } else {
          const errorMessage = formatError(response.data?.message);
          dispatch(loginFailedAction(errorMessage));
        }
      })
      .catch((error) => {
        console.log(error);
        // const errorMessage = formatError(error);
        // dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
