import axios from 'axios';

export * from './offers';
export * from './categories';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;
