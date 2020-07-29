import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = apiUrl + '/auth';

export function login(email, password) {
  return http.post(url, { email, password });
}
