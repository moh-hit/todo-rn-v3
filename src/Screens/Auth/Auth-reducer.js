import {
  SIGNIN_INTI,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  GET_USER_DETAILS_INTI,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
} from './actionTypes'

const initialState = {
  isFetchingVersion: false,
  isFetchingUser: false,
  user_details: {},

  isLogging: false,
  loginError: false,
  loginErrorMsg: '',
  loginResp: {},
  isLoggedIn: false,

}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_INTI:
      return {
        ...state,
        isFetchingUser: true,
        userDetailsError: false,
      }

    case GET_USER_DETAILS_SUCCESS: {
      const { data } = action
      return {
        ...state,
        user_details: data,
        isFetchingUser: false,
      }
    }

    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        isFetchingUser: false,
        userDetailsError: true,
        userDetailsErrorMsg: action.error,
      }
    case SIGNIN_INTI:
      return {
        ...state,
        isLogging: true,
        loginError: false,
        loginErrorMsg: '',
        isLoggedIn: false,
      }

    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isLogging: false,
        loginError: false,
        loginErrorMsg: '',
        loginResp: action.data,
        isLoggedIn: true,
        user_details: {},
      }
    }

    case SIGNIN_FAILURE:
      return {
        ...state,
        isLogging: false,
        loginError: true,
        loginErrorMsg: action.error,
      }

    default:
      return state
  }
}

export default auth
