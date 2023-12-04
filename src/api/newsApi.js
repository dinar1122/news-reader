import axios from 'axios';

const key = '032786a8d31547f097edb66fcb2eae09'

const instance = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  headers: {
    Authorization: `Bearer ${key}`
  }
});

export default instance;