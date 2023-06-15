import { getActions } from "../../services/ActionServices";

export function getActionsAction(data) {
    return {
      type: "GET_ACTIONS",
      payload:data,
    };
  }

  export function getActionsList() {
    return (dispatch, getState) => {
      getActions().then((response) => {
        dispatch(getActionsAction(response.data));
      });
    };
  }