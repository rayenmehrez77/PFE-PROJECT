import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";
import axiosInstance from "../services/AxiosInstance";

export function signUp(
  name,
  email,
  OLM,
  gouvernement,
  sexe,
  password,
  confirmPassword
) {
  //axios call
  const postData = {
    name,
    email,
    OLM,
    gouvernement,
    sexe,
    password,
    confirmPassword,
    returnSecureToken: true,
  };
  return axiosInstance.post("/users/signup", postData);
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axiosInstance.post("/users/login", postData);
}

export function editProfile(data,id) {
  
  return axiosInstance.put(`/users/edit-profile/${id}`, data);
}

export function formatError(errorResponse) {
  return errorResponse;
}

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(
    new Date().getTime() + tokenDetails.expiresIn * 1000
  );
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(logout(history));
    return;
  }
  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, history);
}
