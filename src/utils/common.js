import { cloneDeep, isEmpty } from 'lodash'

export const isToday = (time) => {
  const date = new Date(time)

  const today = new Date()
  return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear()
}

export function isFutureDate(date) {
  const d_now = new Date()
  const d_inp = new Date(date)
  return d_now.getTime() <= d_inp.getTime()
}

export function getDateFormat(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const formattedMonth = (`0${month}`).slice(-2)
  const formattedDate = `${year}-${formattedMonth}-${day}`

  return formattedDate
}

export function getFormattedDateTime(time) {
  const date = new Date(time)
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const index = date.getMonth()
  const day = date.getDate().toString().padStart(2, '0')
  const hr = date.getHours().toString().padStart(2, '0')
  const min = date.getMinutes().toString().padStart(2, '0')

  return `${months[index]} ${day}, ${hr}:${min}`
}

export function formatDatePicker(timeData = {}) {
  const { date, time } = timeData
  const formattedTime = time?.ampm === 'PM' ? Number(time?.hr) + 12 : time?.hr
  const formattedHr = formattedTime === 24 ? '00' : formattedTime
  const formattedDate = new Date(`${date}T${formattedHr}:${time?.min}:00`)
  return formattedDate
}

export const getPlainQueryParams = (params) => {
  let queryParamString = ''
  if (params && Object.keys(params).length) {
    queryParamString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')
    queryParamString = `?${queryParamString}`
  }
  return queryParamString
}

export const mergeHeaders = (defaultHeaders, newheaders) => {
  const mergedHeaders = cloneDeep(defaultHeaders)
  const headersLocation = newheaders instanceof Headers ? newheaders.map : newheaders
  if (!isEmpty(headersLocation)) {
    Object.keys(newheaders).forEach((head) => {
      mergedHeaders.set(head, headersLocation[head])
    })
  }
  return mergedHeaders
}
