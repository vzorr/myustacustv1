import axios from 'axios';

export const BASE_API_URL_STAGGING = 'http://47.254.134.96:3000/api/';
const BASE_API_URL_PRODUCTION = 'http://47.254.134.96:3000/api/';

export const client = (token = null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
}
export const client1 = (token = null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export const otpClient = (token = null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'application/json',
            "x-auth-otp": token,
        },
    });
}

export const ClientFormData = (token = null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}