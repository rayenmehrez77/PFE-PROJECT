import axiosInstance from "./AxiosInstance";

export function getForums() {
    return axiosInstance.get('/forums');
}