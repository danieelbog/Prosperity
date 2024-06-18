import axios from 'axios';

const PROTOCOL = 'https';
const HOST = 'assignment.prosperty-mgmt.dev';
const BASE_PATH = 'v1';

const createInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return instance;
};

export const api = createInstance(`${PROTOCOL}://${HOST}/${BASE_PATH}`);
