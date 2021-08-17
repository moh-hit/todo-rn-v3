import React, { useEffect } from 'react'
import {
  StyleSheet, View, TouchableOpacity,
} from 'react-native'

import {
  COLORS, normalize, SPACING,
} from '../Theme'
import { BOTTOM_TABS } from '../utils/navigationConstant'
import { useTheme } from '../Theme/ThemeProvider'
import CustomText from './CustomText'
import Icon from './Icon'

const TabBarButton = (props) => {
  const {
    onPress, onLongPress, navigation, route,
  } = props

  const { styles, isDark, theme } = useTheme(stylesheet)

  const scrollTimer = null

  useEffect(() => {
    return () => {
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  })

  const isFocused = navigation.isFocused()

  let iconColor

  if (isDark) {
    iconColor = isFocused ? BOTTOM_TABS[route.name].color : COLORS.WHITE
  } else {
    iconColor = isFocused ? BOTTOM_TABS[route.name].color : COLORS.BLACK
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={[styles.buttonContainer,
        { backgroundColor: isFocused ? BOTTOM_TABS[route.name].colorLight : theme.bgPrimary }]}
      >

        <Icon
          name={BOTTOM_TABS[route.name].icon}
          color={iconColor}
          size={isFocused ? 24 : 22}
        />
        {isFocused && (
        <CustomText color={iconColor} style={styles.textStyle}>
          {BOTTOM_TABS[route.name].name}
        </CustomText>
        )}
      </View>

    </TouchableOpacity>
  )
}

const stylesheet = theme => StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.SPACE_6,
    paddingVertical: SPACING.SPACE_6,
    borderRadius: 100,
  },
  textStyle: {
    marginHorizontal: SPACING.SPACE_6,
    fontSize: normalize(16),
  },
})

export default TabBarButton
