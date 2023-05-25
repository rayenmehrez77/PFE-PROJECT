import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";
import axiosInstance from "../services/AxiosInstance";

export function signUp(name, email, OLM, password, confirmPassword) {
  //axios call
  const postData = {
    name,
    email,
    OLM,
    password,
    confirmPassword,
    returnSecureToken: true,
  };
  return axiosInstance.post("/signup", postData);
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axiosInstance.post("/login", postData);
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
