import axios from "axios";
import { getUsersList } from "../../services/userServices";
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} from "../actions/userActions";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      getUsersList()
      .then((response) => {
        console.log(response);
        
          dispatch(getUsersSuccess(response.data));
       
      })
      .catch((error) => {
        console.log(error);
        // const errorMessage = formatError(error);
        // dispatch(loginFailedAction(errorMessage));
      });

      

      
    } catch (error) {
      dispatch(getUsersFailure(error.message));
    }
  };
};
