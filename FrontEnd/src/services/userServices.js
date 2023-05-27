import axiosInstance from "./AxiosInstance";

export function getUsersList() {
    return axiosInstance.get('/users');
}