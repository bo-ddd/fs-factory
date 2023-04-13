import { requestHttp } from "./http"
import { $showLoading, $hideLoading } from "@mars/components/mars-ui"
import { requestLocal } from "./cache"

export interface RequestOptionLocal {
  method: any
  url: string
  noloading?: boolean
  localParams?: any
  data?: any
  params?: any
}

export interface ResponseDataLocal {
  code: number
  message: string
  data: any
}

// 标识是否使用本地浏览器缓存
const LOCAL = true

export default async function request(options: RequestOptionLocal) {
  if (!options.noloading) {
    $showLoading()
  }
  const params = {
    ...options
  }

  let result
  try {
    if (LOCAL) {
      result = await requestLocal(options)

    } else {
      delete params.localParams
      delete params.noloading

      result = await requestHttp(options)
    }
    if (!options.noloading) {
      $hideLoading()
    }
  } catch (err) {
    if (!options.noloading) {
      $hideLoading()
    }
  }
  return result
}
