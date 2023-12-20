import axios from "axios";

export * from './offers';

axios.defaults.baseURL = `${process.env.HOST}/api`;
