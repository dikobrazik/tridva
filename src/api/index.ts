import axios from 'axios';

export * from './auth';
export * from './offers';
export * from './categories';
export * from './reviews';
export * from './basket';
export * from './groups';
export * from './orders';
export * from './profile';
export * from './geo';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;

if (typeof window === 'undefined') {
    axios.defaults.baseURL = `${process.env.HOST}/api`;
}

axios.interceptors.request.use(function (config) {
    // Говнохак, пока не посадим сервер и клиент на один домен
    if (typeof window === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const token = require('next/headers').cookies().get('token');
        config.headers.Authorization = `Bearer ${token?.value}`;
    }

    return config;
});
