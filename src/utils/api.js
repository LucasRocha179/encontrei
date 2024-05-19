import axios from "axios";

const api = axios.create({
  baseURL: "https://xxxxxx.com.br:3002/", //prod
  //baseURL: "http://controle.xxxxxx.com.br:3002/", //desenv
});

export default api;