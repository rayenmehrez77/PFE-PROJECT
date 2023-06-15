import axiosInstance from "./AxiosInstance";

export function getActions() {
    return axiosInstance.get('/actions');
}