import AsyncStorage from '@react-native-async-storage/async-storage'
import { isEmpty, isEqual } from 'lodash'
import React, { PureComponent } from 'react'
import {
  View, SafeAreaView, StatusBar, Platform,
} from 'react-native'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import Splashscreen from './src/Components/SplashScreen'
import { AppScreens, AuthScreens } from './src/screens'
import {
  clearLoginResp, getUserDetails, userSignin,
} from './src/Screens/Auth/actions'
import { COLORS } from './src/Theme'
import { withTheme } from './src/Theme/ThemeProvider'
import Onboarding from './src/UI/Onboarding/Onboarding'
import { Snackbar } from './src/UI/Snackbar'
import { ASYNCSTORAGE_MAP } from './src/utils/consts'

const AppView = Platform.select({
  ios: SafeAreaView,
  android: View,
})

const ROUTES = {
  AUTH: 'auth',
  APP: 'app',
  ONBOARDING: 'onboarding',
  LOADING: 'loading',
}
const MAX_SPLASHSCREEN_TIME = 1000

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeRoute: ROUTES.LOADING,
    }
    this.initializeTime = new Date()
  }

  componentDidUpdate(prevProps) {
    const {
      loginResp,
      fetchUserDetails,
      user_details = {},
      userDetailsError,
      userDetailsErrorMsg,
      isLoggedIn,
      clearLoginResponse,
      isFetchingUser,
    } = this.props
    const { activeRoute } = this.state
    const { uid } = user_details
    if (!isEqual(prevProps.loginResp, loginResp) && loginResp && !isFetchingUser) {
      auth().onAuthStateChanged(user => fetchUserDetails(user))
    } else if (loginResp && !uid && !isFetchingUser && !userDetailsError) {
      auth().onAuthStateChanged(user => fetchUserDetails(user))
    }
    // user details came check for terms
    if (prevProps.user_details.uid !== uid && isLoggedIn && uid) {
      if (activeRoute !== ROUTES.APP) {
        AsyncStorage.setItem(ASYNCSTORAGE_MAP.AUTH_TOKEN, loginResp)
        this.compareTimeAndUpdate(
          { activeRoute: ROUTES.APP }, this.initializeTime, MAX_SPLASHSCREEN_TIME,
        )
        // this.setState({ activeRoute: ROUTES.APP })
      } else {
        AsyncStorage.setItem(ASYNCSTORAGE_MAP.AUTH_TOKEN, loginResp)
      }
    } else if (prevProps.userDetailsError !== userDetailsError && userDetailsError) {
      // log out on auth error
      if (userDetailsErrorMsg === 'auth' || !uid) {
        clearLoginResponse()
      }
    }
  }

  async componentDidMount() {
    // AsyncStorage.removeItem(ASYNCSTORAGE_MAP.SHOW_ONBOARDING)
    // AsyncStorage.removeItem(ASYNCSTORAGE_MAP.AUTH_TOKEN)
    this.showOnboarding = await AsyncStorage.getItem(
      ASYNCSTORAGE_MAP.SHOW_ONBOARDING,
    )
    if (this.showOnboarding !== 'false') {
      this.compareTimeAndUpdate(
        { activeRoute: ROUTES.ONBOARDING },
        this.initializeTime,
        MAX_SPLASHSCREEN_TIME,
      )
      // this.setState({ activeRoute: ROUTES.ONBOARDING })
    } else {
      this.checkLogin()
    }
  }

  compareTimeAndUpdate = (
    newState = {},
    compareTime = new Date(),
    maxTime = 0,
  ) => {
    const timeDiff = Math.abs(
      new Date().getMilliseconds() - compareTime.getMilliseconds(),
    )
    if (timeDiff > maxTime) {
      this.setState(newState)
    } else {
      this.stateUpdateTimer = setTimeout(() => {
        this.setState(newState)
      }, Math.abs(maxTime - timeDiff))
    }
  };

  checkLogin = async () => {
    const { signIn } = this.props
    try {
      const value = await AsyncStorage.getItem(ASYNCSTORAGE_MAP.AUTH_TOKEN) // user_details
      if (value !== null && !isEmpty(value)) {
        signIn(value)
      } else {
        this.compareTimeAndUpdate(
          { activeRoute: ROUTES.AUTH },
          this.initializeTime,
          MAX_SPLASHSCREEN_TIME,
        )
        // this.setState({ activeRoute: ROUTES.AUTH })
      }
    } catch (e) {
      this.compareTimeAndUpdate(
        { activeRoute: ROUTES.AUTH },
        this.initializeTime,
        MAX_SPLASHSCREEN_TIME,
      )
      // this.setState({ activeRoute: ROUTES.AUTH })
    }
  };

  markOnboardingComplete = () => {
    this.showOnboarding = 'false'
    AsyncStorage.setItem(ASYNCSTORAGE_MAP.SHOW_ONBOARDING, 'false')
    this.checkLogin()
  };

  componentWillUnmount() {
    if (this.updateAlertTimer) {
      clearTimeout(this.updateAlertTimer)
    }
    if (this.stateUpdateTimer) {
      clearTimeout(this.stateUpdateTimer)
    }
  }

  render() {
    const { activeRoute } = this.state
    const { theme, isDark } = this.props
    const appViewStyle = { flex: 1, backgroundColor: theme.bgPrimary }
    const barStyle = isDark ? 'light-content' : 'dark-content'

    if (activeRoute === ROUTES.AUTH) {
      return (
        <View style={appViewStyle}>
          <StatusBar backgroundColor={COLORS.WHITE} barStyle="light-content" />
          {AuthScreens()}
          <Snackbar />
        </View>
      )
    }
    if (activeRoute === ROUTES.APP) {
      return (
        <AppView style={appViewStyle}>
          <StatusBar backgroundColor={theme.bgPrimary} barStyle={barStyle} />
          {AppScreens()}
          <Snackbar />
        </AppView>
      )
    }
    if (activeRoute === ROUTES.ONBOARDING) {
      return (
        <View style={appViewStyle}>
          <StatusBar backgroundColor={COLORS.WHITE} barStyle="light-content" />
          <Onboarding onFinish={this.markOnboardingComplete} />
          <Snackbar />
        </View>
      )
    }
    return (
      <>
        <View style={appViewStyle}>
          <StatusBar backgroundColor={COLORS.WHITE} barStyle="light-content" />
          <Splashscreen />
          <Snackbar />
        </View>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // appLoading: state.auth.appLoading,
    loginResp: state.auth.loginResp,
    user_details: state.auth.user_details,
    userDetailsError: state.auth.userDetailsError,
    userDetailsErrorMsg: state.auth.userDetailsErrorMsg,
    isLoggedIn: state.auth.isLoggedIn,
    isFetchingUser: state.auth.isFetchingUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDetails: params => dispatch(getUserDetails(params)),
    signIn: loginResp => dispatch(userSignin(loginResp)),
    clearLoginResponse: () => dispatch(clearLoginResp()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(undefined)(App))
