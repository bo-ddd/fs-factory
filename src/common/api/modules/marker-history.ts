import request from "../api"
import { MARS_MARKER_HISTORY } from "../cache"

// 我的标记的历史记录处理

// 添加
export function addMarkerPointHistory(data) {
  return request({
    method: "post",
    url: "mark/insert",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "put"
    },
    data
  })
}
// 批量添加
export function addMarkerPointcalList(data) {
  return request({
    method: "post",
    url: "mark/insertList",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "post"
    },
    data
  })
}

// 修改
export function updateMarkerPointHistory(data) {
  return request({
    method: "post",
    url: "mark/update",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "put"
    },
    data
  })
}

// 获取历史记录的列表
export function getMarkerPointHistoryList(data = null) {
  return request({
    method: "get",
    url: "mark/select",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "get"
    },
    data
  })
}

// 根据id获取该条记录
export function getMarkerPointHistoryById(id) {
  return request({
    method: "get",
    url: "mark/get",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "get"
    },
    params: { id }
  })
}

// 删除该条记录
export function deleteMarkerPointHistoryById(id) {
  return request({
    method: "post",
    url: "mark/delete",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "delete"
    },
    data: { id }
  })
}

// 删除所有数据
export function deleteAll() {
  return request({
    method: "post",
    url: "mark/deleteAll",
    localParams: {
      apiName: MARS_MARKER_HISTORY,
      type: "delete"
    }
  })
}
