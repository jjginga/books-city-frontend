import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = apiUrl + '/categories';

export function getCategories() {
  return http.get(url);
}
