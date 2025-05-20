import axios from 'axios';

export const BASE_API_URL_STAGGING = 'http://151.243.213.116:3000/api/';
// export const BASE_API_URL_STAGGING = 'http://47.254.134.96:5000/api/v1/';
const BASE_API_URL_PRODUCTION = 'http://151.243.213.116:3000/api/';
export const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
export const BASE_SCOCKET_URL = 'http://151.243.213.116:5000/api/v1/';
export const BASE_CHAT_URL = 'http://151.243.213.116:5000/api/v1/';
export const BASE_NOTIFICATION_URL = 'http://151.243.213.116:5000/api/v1/';
// http://localhost:5000/api/v1/

export const client = (token = null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
}
export const notificationClient = (token = null) => {
    return axios.create({
        baseURL: BASE_NOTIFICATION_URL,
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