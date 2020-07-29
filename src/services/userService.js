import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = apiUrl + '/users';

export function register(user) {
  return http.post(url, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
