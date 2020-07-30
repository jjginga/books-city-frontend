import http from './httpService';

const url = '/publishers';

export function getPublishers() {
  return http.get(url);
}
