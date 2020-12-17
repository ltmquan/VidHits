import axios from 'axios'

const client = axios.create({
    baseURL: 'https://vidhits.herokuapp.com'
})
export default client;
