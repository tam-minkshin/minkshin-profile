import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://649e88de245f077f3e9c7e10.mockapi.io',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });
  export default Axios