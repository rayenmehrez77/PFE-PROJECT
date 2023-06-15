import { getTrainings } from "../../services/TrainingServices";

export function getTrainingsAction(data) {
    return {
      type: "GET_TRAININGS",
      payload:data,
    };
  }

  export function getTrainingsList() {
    return (dispatch, getState) => {
      getTrainings().then((response) => {
        dispatch(getTrainingsAction(response.data));
      });
    };
  }