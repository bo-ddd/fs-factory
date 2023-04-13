import request from "../api"

export function login(data: any) {
  return request({
    url: "user/login",
    method: "post",
    localParams: {
      type: "user"
    },
    data
  })
}

export function getUserInformation() {
  return request({
    url: "user/getUser",
    localParams: {
      type: "user"
    },
    method: "get"
  })
}

export function updateUserInformation(data: any) {
  return request({
    url: "user/updateUser",
    localParams: {
      type: "user"
    },
    method: "post",
    data
  })
}

export function checkLogin() {
  return request({
    url: "user/checkLogin",
    localParams: {
      type: "user"
    },
    method: "get"
  })
}

export function loginOut() {
  return request({
    url: "user/loginOut",
    localParams: {
      type: "user"
    },
    method: "get"
  })
}

export function register(data: any) {
  return request({
    url: "user/register",
    localParams: {
      type: "user"
    },
    method: "post",
    data
  })
}

export function resetPassword(data: any) {
  return request({
    url: "user/resetPassword",
    localParams: {
      type: "user"
    },
    method: "post",
    data
  })
}

export function destroyAccount() {
  return request({
    url: "user/destroy",
    method: "post"
  })
}

export function getCode(data: any) {
  return request({
    url: "user/getCode",
    localParams: {
      type: "user"
    },
    method: "post",
    data
  })
}

export function loginWithCode(data: any) {
  return request({
    url: "user/loginWithCode",
    localParams: {
      type: "user"
    },
    method: "post",
    data
  })
}
