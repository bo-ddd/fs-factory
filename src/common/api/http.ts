import { $message } from "@mars/components/mars-ui"
import axios from "axios"
import type { RequestOptionLocal } from "./api"

const instance = axios.create({
  baseURL: process.env.API_BASE,
  withCredentials: true,
  timeout: 1000 * 30
})

// 请求拦截器
instance.interceptors.request.use(
  // 在发送请求之前的处理
  function (config) {
    const token = localStorage.getItem("mars-user-token")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  // 对请求错误的处理
  function (error) {
    console.log("API请求错误信息", error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。对响应数据做处理
  function (response) {
    const code = response.data.code
    if (code === 401 || code === 403) {
      $message("当前未登陆，无法读取或保存历史数据")

      // location.href = "./login.html?back="

      return Promise.reject(new Error("当前未登陆，无法读取或保存历史数据"))
    }
    return response
  },
  function (error) {
    $message("请求出错,请稍后再试")
    return Promise.reject(error)
  }
)

export async function requestHttp(options: RequestOptionLocal) {
  const { data } = await instance.request(options)
  return data
}
