import http from './httpService';

const url = '/categories';

export function getCategories() {
  return http.get(url);
}

export function saveCategory(category) {
  return http.post(url, category);
}
