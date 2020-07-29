import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = apiUrl + '/publishers';

export function getPublishers() {
  return http.get(url);
}
