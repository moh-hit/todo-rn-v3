import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { withTheme } from '../Theme/ThemeProvider'
import { COLORS, ICONS, normalize } from '../Theme'
import Icon from './Icon'
import { PALETTE_COLORS } from '../Theme/style_consts'

function FAB({ color = COLORS.CREATIVE_COLOR, onPress, styles }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.addIcon, { backgroundColor: color }]}>
        <Icon name={ICONS.PLUS} size={32} color={COLORS.WHITE} />
      </View>
    </TouchableWithoutFeedback>

  )
}
const stylesheet = () => StyleSheet.create({
  addIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: PALETTE_COLORS.GREEN,
    padding: normalize(10),
    borderRadius: 100,
  },
})
export default withTheme(stylesheet)(FAB)
