import http from './httpService';

const url = '/authors';

export function getAuthors() {
  return http.get(url);
}

export function saveAuthor(author) {
  return http.post(url, author);
}
