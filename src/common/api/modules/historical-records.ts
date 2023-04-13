import request from "../api"
import { MARS_HISTORICAL_RECORDS } from "../cache"

// 添加
export function addHistoricalRecords(data) {
  return request({
    method: "post",
    url: "history/insert",
    localParams: {
      apiName: MARS_HISTORICAL_RECORDS,
      type: "put"
    },
    data
  })
}
export function addHistoricalList(data) {
  return request({
    method: "post",
    url: "history/insertList",
    localParams: {
      apiName: MARS_HISTORICAL_RECORDS,
      type: "put"
    },
    data: {
      list: data
    }
  })
}

// 修改
export function updateHistoryRecords(data) {
  return request({
    method: "post",
    url: "history/update",
    localParams: {
      apiName: MARS_HISTORICAL_RECORDS,
      type: "put"
    },
    data
  })
}

// 查询所有
export function getHistoricalRecordsList(data = null) {
  return request({
    method: "get",
    url: "history/select",
    localParams: {
      apiName: MARS_HISTORICAL_RECORDS,
      type: "get"
    },
    params: data
  })
}

// 根据ID查询
export function getHistoricalRecordsById(id) {
  return request({
    method: "get",
    url: "history/get",
    localParams: {
      apiName: MARS_HISTORICAL_RECORDS,
      type: "get"
    },
    params: { id }
  })
}

// 根据ID删除
export function deleteHistoricalRecordsById(id) {
  return request({
    method: "post",
    url: "history/delete",
    localParams: {
      apiName: MARS_HISTORICAL_RECORDS,
      type: "delete"
    },
    data: { id }
  })
}
