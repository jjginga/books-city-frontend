import http from './httpService';

const url = '/authors';

export function getAuthors() {
  return http.get(url);
}
