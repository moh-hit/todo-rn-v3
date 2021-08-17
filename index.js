import React from 'react'
import { AppRegistry, LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import App from './App'
import { navigationRef, isReadyRef } from './src/utils/navigationUtils'
import store from './src/store'
import ThemeProvider from './src/Theme/ThemeProvider'
import { name as appId } from './app.json'

AppRegistry.registerComponent(appId, () => gestureHandlerRootHOC(AppContainer))

const AppContainer = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true
          }}
        >
          <App />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}

LogBox.ignoreLogs([
  'Require cycle',
  'VirtualizedLists should never',
  'Non-serializable values were found in the navigation state',
  'Setting a timer',
])
