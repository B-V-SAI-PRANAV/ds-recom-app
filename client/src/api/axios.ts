//we have to create an axios instance to call backend
import axios from "axios";

const instance=axios.create({
    baseURL:"http://localhost:5000/api",//base url for all requests 
    withCredentials:true,//enable sending or receiving credentials for auth
});

export default instance;

//we use this axios instance to send http requests to the backend with consistent config 