import axios from "axios";

const api = axios.create({
    baseURL:"https://hreader-backend-v1.herokuapp.com/"
});

export default api;