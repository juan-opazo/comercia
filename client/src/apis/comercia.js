import axios from 'axios';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: { 
        'Accept': 'application/json; indent=4', 
        'Authorization': 'Basic YWRtaW46aG9sYW11bmRvMTc4'
      }
});