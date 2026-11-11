// Imports
import axios from "axios";
import { store } from "../redux/store";

// Axios instance
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//Authentication API functions
export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
}) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async (credentials: {
    email: string;
    password: string;
}) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export default api;