import axios from 'axios';

export * from './offers';
export * from './categories';
export * from './reviews';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;
axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTcwOTA0ODA3OX0.fo2CBpcEXli5dijxnqQSMhhSgG3VikjiBk4kdTsQWig`;
