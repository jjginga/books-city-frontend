import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = apiUrl + '/authors';

export function getAuthors() {
  return http.get(url);
}
