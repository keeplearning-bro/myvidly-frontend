import axios from 'axios';
import { toast } from 'react-toastify';

// 只有在response出问题的时候，才会自动调用这段逻辑
axios.interceptors.response.use(succeed => {
  console.log("INTERCEPTORS CALLED SUCCEED:" + succeed);
  // toast.success("toast notification succeed!")
  return Promise.resolve(succeed)
}, error => {
  console.log("INTERCEPTORS CALLED ERROR");
  // CLIENT ERROR
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500

  // 服务器异常错误，与CLIENT无关
  if (!expectedError) {
    console.log("Logging the error:", error);
    toast.error("An unexpected error occurred!")
    // toast("An unexpected error occurred!")
  }

  return Promise.reject(error)
})

// 向后端发起请求中添加token，从而完成token验证
function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
}