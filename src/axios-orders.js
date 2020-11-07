import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-70072.firebaseio.com/'
});

export default instance;
