import http from './httpService';

const url = '/users';

export function register(user) {
  return http.post(url, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
