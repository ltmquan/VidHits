import axios from 'axios';
const KEY = 'AIzaSyCMeHS4VEY0FQe9qMllBnGc__QeSb4ilWg'

const youtubeClient = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults : 5,
        key: KEY
    }
})
export default youtubeClient;