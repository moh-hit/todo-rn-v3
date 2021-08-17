import {
  CHANGE_DATE_TIME,
  CLEAR_DATE_TIME,
  CREATE_TODO_FAILURE, CREATE_TODO_INIT, CREATE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  DELETE_TODO_INIT,
  DELETE_TODO_SUCCESS,
  FETCH_TODO_FAILURE, FETCH_TODO_INIT, FETCH_TODO_SUCCESS,
  TOGGLE_TODO_DONE_FAILURE, TOGGLE_TODO_DONE_INIT, TOGGLE_TODO_DONE_SUCCESS,
} from './actionTypes'

const initialState = {
  dateTimeData: {},

  isFetchingTodo: false,
  fetchTodoError: null,
  todoData: [],

  isCreatingTodo: false,
  createTodoError: null,
  createdTodo: false,

  isTogglingDone: true,
  toggleTodoDoneError: null,
  toggleTodoDone: false,
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATE_TIME:
      return {
        ...state,
        dateTimeData: action.data,
      }
    case CLEAR_DATE_TIME:
      return {
        ...state,
        dateTimeData: {},
      }
    case FETCH_TODO_INIT:
      return {
        ...state,
        fetchTodoError: null,
        isFetchingTodo: true,
        todoData: [],
      }
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        fetchTodoError: null,
        isFetchingTodo: false,
        todoData: action.data,
      }
    case FETCH_TODO_FAILURE:
      return {
        ...state,
        fetchTodoError: action.error,
        isFetchingTodo: false,
        todoData: [],
      }
    case CREATE_TODO_INIT:
      return {
        ...state,
        isCreatingTodo: true,
        createTodoError: null,
        createdTodo: false,
      }
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        isCreatingTodo: false,
        createTodoError: null,
        createdTodo: true,
      }
    case CREATE_TODO_FAILURE:
      return {
        ...state,
        isCreatingTodo: false,
        createTodoError: action.error,
        createdTodo: true,
      }
    case TOGGLE_TODO_DONE_INIT:
      return {
        ...state,
        isTogglingDone: true,
        toggleTodoDoneError: null,
        toggleTodoDone: false,
      }
    case TOGGLE_TODO_DONE_SUCCESS:
      return {
        ...state,
        isTogglingDone: false,
        toggleTodoDoneError: null,
        toggleTodoDone: true,
      }
    case TOGGLE_TODO_DONE_FAILURE:
      return {
        ...state,
        isTogglingDone: false,
        toggleTodoDoneError: action.error,
        toggleTodoDone: true,
      }
    case DELETE_TODO_INIT:
      return {
        ...state,
        isDeletingTodo: true,
        todoDeleteError: null,
        todoDeleted: false,
      }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        isDeletingTodo: false,
        todoDeleteError: null,
        todoDeleted: true,
      }
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        isDeletingTodo: false,
        todoDeleteError: action.error,
        todoDeleted: false,
      }
    default:
      return state
  }
}

export default todo
