import axios from 'axios';

export const BASE_API_URL_STAGGING = 'https://api.cartsbay.com/api/';
const BASE_API_URL_PRODUCTION = 'https://api.cartsbay.com/api/';
export const BASE_SCOCKET_URL = 'http://44.212.152.28:8083/';
export const IMAGE_BASE_URL = 'https://cartsbay.s3.amazonaws.com';
// export const BASE_SCOCKET_URL = 'http://44.212.152.28:8085/';
export const client = (token=null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": token,
        },
    });
}
export const otpClient = (token=null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'application/json',
            "x-auth-otp": token,
        },
    });
}

export const ClientFormData = (token=null) => {
    return axios.create({
        baseURL: BASE_API_URL_STAGGING,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}