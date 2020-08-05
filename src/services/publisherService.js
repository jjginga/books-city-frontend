import http from './httpService';

const url = '/publishers';

export function getPublishers() {
  return http.get(url);
}

export function savePublisher(publisher) {
  return http.post(url, publisher);
}
