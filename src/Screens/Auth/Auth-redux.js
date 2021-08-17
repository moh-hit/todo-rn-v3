import { connect } from 'react-redux'
import { userSignin } from './actions'
import Auth from './Auth'

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: token => dispatch(userSignin(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
