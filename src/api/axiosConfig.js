import axios from 'axios';

export default axios.create({
    baseURL: 'http://backend:8080',
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-type': 'application/json'
    },
});