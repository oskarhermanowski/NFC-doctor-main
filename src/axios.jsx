import axios from "axios";

const instance = axios.create({
    baseURL: 'https://node-db-main.onrender.com'
});

export default instance;