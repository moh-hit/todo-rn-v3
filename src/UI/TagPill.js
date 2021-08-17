import React from 'react'
import {
  StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native'
import { withTheme } from '../Theme/ThemeProvider'
import {
  COLORS, ICONS, normalize, SPACING,
} from '../Theme'
import CustomText from './CustomText'
import Icon from './Icon'

function Habit(props) {
  const {
    styles, label, color, onPress, active = 'All', isDark, isAddTag, onAddTag, value, noColor, theme,
  } = props

  const selected = active === label || active === value
  const labelColor = selected && noColor ? theme.bgPrimary
    : selected ? COLORS.WHITE : isDark ? COLORS.WHITE : COLORS.BLACK

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor: selected ? color : 'transparent', borderColor: color }]}>
        {isAddTag && (
        <Icon
          name={ICONS.PLUS}
          size={16}
          style={{ marginRight: SPACING.SPACE_4 }}
          color={labelColor}
          onPress={onAddTag}
        />
        )}
        <CustomText color={labelColor} size="medium" weight="bold">{isAddTag ? 'Create new' : label}</CustomText>
      </View>
    </TouchableWithoutFeedback>

  )
}
const stylesheet = () => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(5),
    minWidth: 75,
    paddingHorizontal: normalize(14),
    borderRadius: 100,
    marginHorizontal: normalize(10),
    borderWidth: 1,

  },
})
export default withTheme(stylesheet)(Habit)
