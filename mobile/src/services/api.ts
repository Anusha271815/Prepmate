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

export const createInterview = async (interviewData: {
    role: string;
    experience: string;
    difficulty: string;
    interviewType: string;
    totalQuestions: number;
}) => {
    const response = await api.post("/interviews", interviewData);
    return response.data;
};
export const startInterviewSession = async (interviewId: string) => {
    const response = await api.post("/sessions/start", {
        interviewId
    });
    return response.data;
};

export const generateQuestions = async (sessionId: string) => {
    const response = await api.post("/sessions/generate-questions", {
        sessionId
    });
    return response.data;
};

export const getCurrentQuestion = async (sessionId: string) => {
    const response = await api.get(`/sessions/questions/${sessionId}`);
    return response.data;
};

export const submitAnswer = async (
    sessionId: string,
    answerText: string
) => {
    const response = await api.post(
        `/sessions/questions/${sessionId}/answers`,
        { answerText }
    );
    return response.data;
};

export const completeInterviewSession = async (sessionId: string) => {
    const response = await api.put(
        `/sessions/complete/${sessionId}`
    );
    return response.data;
};

export const getSessionDetails = async (sessionId: string) => {
    const response = await api.get(
        `/sessions/details/${sessionId}`
    );
    return response.data;
};


export default api;