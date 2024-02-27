import axios from 'axios';

export * from './offers';
export * from './categories';
export * from './reviews';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;
