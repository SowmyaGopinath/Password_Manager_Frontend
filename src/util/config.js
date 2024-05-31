import axios from 'axios';
import { API } from './constants';
const webClient = axios.create({
    baseURL: API.BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export {webClient};