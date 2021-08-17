import cloneDeep from 'lodash/cloneDeep'
import { getPlainQueryParams, mergeHeaders } from './common'

let defaultHeaders = new Headers()

export const setHeaders = (obj) => {
  const headers = new Headers()
  if (obj) {
    Object.keys(obj).forEach(key => headers.append(key, obj[key]))
  }
  defaultHeaders = headers
}

export const getRequest = async (url, params) => {
  const queryParams = getPlainQueryParams(params)
  // if (headers && url === `${baseUrl}${prodEndpoints.get_session_status}`) {
  //   defaultHeaders = headers
  // }
  const data = await fetch(`${url}${queryParams}`, {
    method: 'GET',
    headers: defaultHeaders,
  })
    .then((resp) => {
      return resp.json()
    })
    .catch((err) => {
      if (__DEV__) { // eslint-disable-line
        console.log(`err while fetching ${url}`)
      }
      throw err
    })
  return data
}

export const postRequest = async (url, params, headers) => {
  const final_headers = mergeHeaders(defaultHeaders, headers)
  const queryParams = getPlainQueryParams(params)

  const data = await fetch(`${url}${queryParams}`, {
    method: 'POST',
    headers: final_headers,
  })
    .then(resp => resp.json())
    .catch((err) => {
      if (__DEV__) { // eslint-disable-line
        console.log(`err while posting data to ${url}`, err)
      }
      throw err
    })
  return data
}

export const deleteRequest = async (url, body, headers) => {
  let final_headers = defaultHeaders
  if (headers) {
    final_headers = cloneDeep(final_headers)
    if (headers instanceof Headers) {
      final_headers = Object.keys(headers.map).forEach((head) => {
        final_headers.set(head, headers[head])
      })
    } else if (Object.keys(headers).length) {
      Object.keys(headers).forEach((head) => {
        final_headers.set(head, headers[head])
      })
    }
  }
  const data = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers,
  })
    .then(resp => resp.json())
    .catch((err) => {
      if (__DEV__) { // eslint-disable-line
        console.log(`err while deleting data on ${url}`)
      }
      throw err
    })
  return data
}
