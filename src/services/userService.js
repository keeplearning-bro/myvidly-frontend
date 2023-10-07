import http from "./httpService" // export default {xxx,yyy}

const apiEndpoint = process.env.REACT_APP_URL + "/users"

export function register(user) {
  console.log('apiEndpoint:', apiEndpoint);
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  })
}