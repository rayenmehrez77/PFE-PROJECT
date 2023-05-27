import axios from "axios";
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} from "../actions/userActions";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(getUsersRequest());

      const response = await axios.get("/users");
      const users = response.data;

      dispatch(getUsersSuccess(users));
    } catch (error) {
      dispatch(getUsersFailure(error.message));
    }
  };
};
