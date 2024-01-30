import axios from 'axios';

export * from './offers';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;
