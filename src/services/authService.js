import http from "./httpService" // export default {xxx,yyy}
import jwtDecode from 'jwt-decode'

const apiEndpoint = process.env.REACT_APP_URL + "/auth"
const tokenKey = "token"

http.setJwt(getJwt())

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password })
  localStorage.setItem(tokenKey, jwt)
}

export async function loginWithJwt(jwt) {
  // localStorage.setItem(tokenKey, response.headers["x-auth-token"])
  localStorage.setItem(tokenKey, jwt)
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    const user = jwtDecode(jwt)
    // console.log('token: ' + jwt);
    // console.log的时候，对于object, 不能用"+"，而应该用 ",", 否则打印错误
    // console.log('user: ', user);
    return user
  } catch (error) {
    return null
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
}