import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux'
// import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'

import auth from './Screens/Auth/Auth-reducer'
import todo from './Screens/Todo/Todo-Reducer'
import habit from './Screens/Habit/Habit-Reducer'

const appReducer = combineReducers({
  auth,
  todo,
  habit,
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_USER_DETAILS') {
    state = undefined
  }

  return appReducer(state, action)
}

let composeEnhancers = compose
/* eslint-disable */
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

// Connect our store to the reducers

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store