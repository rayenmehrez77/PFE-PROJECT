import axiosInstance from "./AxiosInstance";

export function getTrainings() {
    return axiosInstance.get('/trainings');
}
