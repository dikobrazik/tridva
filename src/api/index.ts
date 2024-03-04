import axios from 'axios';

export * from './auth';
export * from './offers';
export * from './categories';
export * from './reviews';
export * from './basket';
export * from './groups';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;
