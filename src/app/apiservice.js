import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8080'
})

export default class ApiService {

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  post(url, obj) {
    const urlRequest = `${this.apiUrl}${url}`;
    return httpClient.post(urlRequest, obj);
  }

  put(url, obj) {
    const urlRequest = `${this.apiUrl}${url}`;
    return httpClient.put(urlRequest, obj);
  }

  delete(url) {
    const urlRequest = `${this.apiUrl}${url}`;
    return httpClient.delete(urlRequest);
  }

  get(url) {
    const urlRequest = `${this.apiUrl}${url}`;
    return httpClient.get(urlRequest);
  }
}