import localforage from "localforage"
import { v4 as uuidV4 } from "uuid"
import type { RequestOptionLocal, ResponseDataLocal } from "./api"

export const MARS_COLLECTIONS_POINT = "mars-collection-point" // 收藏点
export const MARS_MARKER_HISTORY = "mars-marker-history" // 我的标记-标记点历史记录
export const MARS_USER_INFORMATION = "mars-user-information" // 用户信息
export const MARS_HISTORICAL_RECORDS = "mars-historical-records" // 历史记录

export async function requestLocal(options: RequestOptionLocal): Promise<ResponseDataLocal> {
  const type = options.localParams.type.toLowerCase()
  const data = options.data || options.params
  switch (type) {
    case "get": {
      // 查询
      const base = await localforage.getItem<string>(options.localParams.apiName)
      let list = []
      let result: any = null
      if (base) {
        list = JSON.parse(base) || []
      }
      if (data && data.id) {
        result = list.find((item) => item.id === data.id)
      } else {
        result = list
      }
      return {
        code: 200,
        message: "操作成功",
        data: result
      }
    }
    case "put": {
      // 新增 / 修改
      const base = await localforage.getItem<string>(options.localParams.apiName)
      let list = []
      let row = null
      if (base) {
        list = JSON.parse(base) || []
        if (data.id) {
          let index: number

          list.forEach((item, i) => {
            if (item.id === data.id) {
              index = i
              row = options.data
              return true
            }
            return false
          })
          if (index !== undefined) {
            list[index] = options.data
          } else {
            throw new Error("id不存在")
          }
        } else {
          options.data.id = uuidV4()
          list.push(options.data)
          row = options.data
        }
      } else {
        options.data.id = uuidV4()
        list.push(options.data)
        row = options.data
      }

      localforage.setItem(options.localParams.apiName, JSON.stringify(list))
      return {
        code: 200,
        message: "操作成功",
        data: row
      }
    }
    case "post": {
      // 新增 / 修改
      const base = await localforage.getItem<string>(options.localParams.apiName)
      let list = []
      if (base) {
        list = JSON.parse(base) || []
      }

      options.data.forEach((item) => {
        item.id = uuidV4()
        list = [...list, item]
      })

      localforage.setItem(options.localParams.apiName, JSON.stringify(list))
      return {
        code: 200,
        message: "操作成功",
        data: "成功"
      }
    }
    case "delete": {
      // 删除
      const base = await localforage.getItem<string>(options.localParams.apiName)
      let list = []
      if (base) {
        list = JSON.parse(base) || []
        if (data && data.id) {
          const ids = data.id.split(",")
          list = list.filter((item) => {
            return ids.indexOf(item.id) === -1
          })
          localforage.setItem(options.localParams.apiName, JSON.stringify(list))
        } else {
          localforage.removeItem(options.localParams.apiName)
        }
      }

      return {
        code: 200,
        message: "操作成功",
        data: {}
      }
    }
    case "user": {
      return localUser(options)
    }
    default:
      return {
        code: 404,
        message: "请求不存在",
        data: {}
      }
  }
}

class User {
  success(data) {
    return {
      result: "ok",
      message: "成功",
      code: 200,
      data
    }
  }

  error(data) {
    return {
      result: "fail",
      message: "登录失败，请检查账号或密码",
      code: 201,
      data
    }
  }

  async login(options) {
    const data = options.data

    if (data?.user_account !== "mars3d" || data?.password !== "mars3d") {
      return this.error({
        token: ""
      })
    }

    return this.success({
      token: ""
    })
  }

  async getCode() {
    return this.success("验证码发送成功")
  }

  async loginWithCode(data) {
    return this.success({
      token: ""
    })
  }

  async getIsLogin() {
    return this.success(true)
  }

  async loginOut() {
    return this.success("退出成功")
  }

  async register() {
    return this.success("注册成功")
  }

  async updateUser() {
    return this.success("修改用户信息成功")
  }

  async resetPassword() {
    return this.success("修改密码成功")
  }

  async getUser() {
    return this.success({
      id: "qwejksdfgsduasibb",
      user_name: "火星科技",
      phone: "13833333333",
      email: "",
      avatar: ""
    })
  }

  async destroy() {
    return this.success("成功")
  }
}

function localUser(options) {
  const apiName = options.url.replace("user/", "")
  return new User()[apiName](options)
}
