import auth from '@react-native-firebase/auth'
import {
  CLEAR_LOGIN_RESP,
  GET_USER_DETAILS_FAILURE,
  GET_USER_DETAILS_INTI,
  GET_USER_DETAILS_SUCCESS,
  SIGNIN_FAILURE, SIGNIN_INTI, SIGNIN_SUCCESS,
} from './actionTypes'

function getUserDetailsInit() {
  return {
    type: GET_USER_DETAILS_INTI,
  }
}

function getUserDetailsSuccess(data) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    data,
  }
}

function getUserDetailsFailure(error) {
  return {
    type: GET_USER_DETAILS_FAILURE,
    error,
  }
}

export function getUserDetails(user) {
  return (dispatch) => {
    dispatch(getUserDetailsInit())
    try {
      const data = user._user.providerData[0]
      if(data) {
        dispatch(getUserDetailsSuccess(data))
      }else {
        dispatch(getUserDetailsFailure('Unable to fetch user details'))
      }
    } catch (error) {
      dispatch(getUserDetailsFailure(error))
    }
  }
}

function userSigninInit() {
  return {
    type: SIGNIN_INTI,
  }
}

export function userSigninSuccess(data) {
  return {
    type: SIGNIN_SUCCESS,
    data,
  }
}

function userSigninFailure(error) {
  return {
    type: SIGNIN_FAILURE,
    error,
  }
}

export function userSignin(token) {
  return (dispatch) => {
    dispatch(userSigninInit())
    try {
      const googleCredential = auth.GoogleAuthProvider.credential(token)
      auth().signInWithCredential(googleCredential)
      if(googleCredential) {
        dispatch(userSigninSuccess(token))
      } else {
        dispatch(userSigninFailure('Unable to signin!'))
      }
    } catch (error) {
      dispatch(userSigninFailure(error))
    }
  }
}

export function clearLoginResp() {
  return {
    type: CLEAR_LOGIN_RESP,
  }
}
