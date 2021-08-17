import { baseUrl, endpoints } from '../../utils/apiEndpoints'
import { getRequest, postRequest } from '../../utils/apiRequests'
import {
  CHANGE_DATE_TIME,
  CLEAR_DATE_TIME,
  FETCH_TODO_INIT, FETCH_TODO_SUCCESS, FETCH_TODO_FAILURE,
  CREATE_TODO_INIT, CREATE_TODO_SUCCESS, CREATE_TODO_FAILURE,
  TOGGLE_TODO_DONE_INIT, TOGGLE_TODO_DONE_SUCCESS, TOGGLE_TODO_DONE_FAILURE,
  DELETE_TODO_INIT, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
} from './actionTypes'

function fetchTodoInit() {
  return{
    type: FETCH_TODO_INIT,
  }
}

function fetchTodoSuccess(data) {
  return{
    type: FETCH_TODO_SUCCESS,
    data,
  }
}

function fetchTodoFailure(error) {
  return{
    type: FETCH_TODO_FAILURE,
    error,

  }
}

export function fetchTodo(params) {
  return (dispatch) => {
    dispatch(fetchTodoInit())
    const url = `${baseUrl}${endpoints.fetchTodo}`
    getRequest(url, params).then((data) => {
      if (!data.error) {
        dispatch(fetchTodoSuccess(data.data))
      } else {
        dispatch(fetchTodoFailure(data.msg))
      }
    })
      .catch(error => dispatch(fetchTodoFailure(error.message)))
  }
}

function createTodoInit() {
  return{
    type: CREATE_TODO_INIT,
  }
}

function createTodoSuccess(data) {
  return{
    type: CREATE_TODO_SUCCESS,
    data,
  }
}

function createTodoFailure(error) {
  return{
    type: CREATE_TODO_FAILURE,
    error,

  }
}

export function createTodo(params) {
  return (dispatch) => {
    dispatch(createTodoInit())
    const url = `${baseUrl}${endpoints.createTodo}`
    postRequest(url, params).then((data) => {
      if (!data.error) {
        dispatch(createTodoSuccess(data.data))
      } else {
        dispatch(createTodoFailure(data.msg))
      }
    })
      .catch(error => dispatch(createTodoFailure(error.message)))
  }
}

function toggleTodoDoneInit() {
  return{
    type: TOGGLE_TODO_DONE_INIT,
  }
}

function toggleTodoDoneSuccess(data) {
  return{
    type: TOGGLE_TODO_DONE_SUCCESS,
    data,
  }
}

function toggleTodoDoneFailure(error) {
  return{
    type: TOGGLE_TODO_DONE_FAILURE,
    error,

  }
}

export function toggleTodoDone(params) {
  return (dispatch) => {
    dispatch(toggleTodoDoneInit())
    const url = `${baseUrl}${endpoints.toggleTodoDone}`
    postRequest(url, params).then((data) => {
      console.log('🚀 => file: actions.js => line 109 => getRequest => data', data)
      if (!data.error) {
        dispatch(toggleTodoDoneSuccess(data.data))
      } else {
        dispatch(toggleTodoDoneFailure(data.msg))
      }
    })
      .catch(error => dispatch(toggleTodoDoneFailure(error.message)))
  }
}

function removeTodoInit() {
  return{
    type: DELETE_TODO_INIT,
  }
}

function removeTodoSuccess(data) {
  return{
    type: DELETE_TODO_SUCCESS,
    data,
  }
}

function removeTodoFailure(error) {
  return{
    type: DELETE_TODO_FAILURE,
    error,

  }
}

export function removeTodo(params) {
  console.log('🚀 => file: actions.js => line 143 => params', params)
  return (dispatch) => {
    dispatch(removeTodoInit())
    const url = `${baseUrl}${endpoints.deleteTodo}`
    postRequest(url, params).then((data) => {
      if (!data.error) {
        dispatch(removeTodoSuccess(data.data))
      } else {
        dispatch(removeTodoFailure(data.msg))
      }
    })
      .catch(error => dispatch(removeTodoFailure(error.message)))
  }
}

export function changeDateTime(data) {
  return {
    type: CHANGE_DATE_TIME,
    data,
  }
}

export function clearDateTime() {
  return {
    type: CLEAR_DATE_TIME,
  }
}
