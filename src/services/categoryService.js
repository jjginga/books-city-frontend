import http from './httpService';

const url = '/categories';

export function getCategories() {
  return http.get(url);
}
