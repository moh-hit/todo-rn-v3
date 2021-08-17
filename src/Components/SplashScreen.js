import React from 'react'
import {
  StyleSheet, View, Image, ActivityIndicator,
} from 'react-native'

import {
  ASSETS, COLORS, normalize,
} from '../Theme'

const { Logo } = ASSETS

const Splashscreen = () => {
  return (
    <View style={styles.screen}>
      <Image source={Logo} style={{ width: 150, height: 150 }} />
      <ActivityIndicator style={{ position: 'absolute', bottom: normalize(100) }} size="small" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
})

export default Splashscreen
