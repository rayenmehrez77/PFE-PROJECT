import {
  editProfile,
  formatError,
  login,
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
  gouvernement,
  sexe,
  password,
  confirmPassword,
  history
) {
  return (dispatch) => {
    signUp(name, email, OLM, gouvernement, sexe, password, confirmPassword)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          saveTokenInLocalStorage(response.data);
          dispatch(confirmedSignupAction(response.data));
          if (response.data.data.user.role === "Super Admin") {
            history.push("/dashboard)");
          } else {
            history.push("/acceuil");
          }
        } else {
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

          if (response.data.data.user.role === "Super Admin") {
            history.push("/dashboard");
          } else {
            history.push("/acceuil");
          }
        } else {
          const errorMessage = formatError(response.data?.message);
          dispatch(loginFailedAction(errorMessage));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function EditProfile(data, id) {
  return (dispatch) => {
    editProfile(data, id)
      .then((response) => {
        console.log(response);

        dispatch(confirmedEditProfileAction(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}
export function confirmedEditProfileAction(data) {
  return {
    type: "EDIT_PROFILE",
    payload:data,
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
