import {
  FETCH_HABIT_FAILURE, FETCH_HABIT_SUCCESS, FETCH_HABIT_INIT,
} from './actionTypes'

const initialState = {
  dateTimeData: {},
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HABIT_INIT:
      return {
        ...state,
      }
    case FETCH_HABIT_SUCCESS:
      return {
        ...state,
      }
    case FETCH_HABIT_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default todo
