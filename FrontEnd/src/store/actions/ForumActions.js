import { getForums } from "../../services/ForumServices";

export function getForumsAction(data) {
    return {
      type: "GET_FORUMS",
      payload:data,
    };
  }

  export function getForumsList() {
    return (dispatch, getState) => {
      getForums().then((response) => {
        dispatch(getForumsAction(response.data));
      });
    };
  }