// import axios
// tạo một instance
import axios from 'axios';
const axiosClient = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
const axiosTodo = axios.create({
    baseURL: 'https://api-todo-jcyg.onrender.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});
export default axiosClient;
export { axiosTodo };
