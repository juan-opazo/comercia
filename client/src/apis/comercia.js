import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    // headers: { 
    //     'Accept': 'application/json; indent=4', 
    //     // 'Authorization': 'Basic YWRtaW46aG9sYW11bmRvMTc4',
    //     // 'Access-Control-Allow-Origin': true
    //   }
});