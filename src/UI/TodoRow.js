import React from 'react'
import {
  Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native'
import PropTypes from 'prop-types'
import { Swipeable } from 'react-native-gesture-handler'
import {
  COLORS, ICONS, normalize, SPACING,
} from '../Theme'
import { withTheme } from '../Theme/ThemeProvider'
import CustomText from './CustomText'
import Icon from './Icon'
import { NAVIGATIONS } from '../utils/navigationConstant'
import { getFormattedDateTime } from '../utils/common'
import { PALETTE_COLORS } from '../Theme/style_consts'

function TodoRow(props) {
  const {
    item: {
      title, done, time,
    }, styles, onPress, onDelete, item, navigation, todoType, theme,
  } = props
  const tagColor = PALETTE_COLORS.PURPLE
  const isTodayTodo = todoType === 'Today'
  const rightActions = (dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    })

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.2, 0],
      extrapolate: 'clamp',
    })
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onDelete}>
          <Animated.View style={[styles.deleteButton, { opacity }]}>
            <Animated.Text
              style={{
                color: COLORS.WHITE,
                fontWeight: '800',
                transform: [{ scale }],
              }}
            >
              <Icon name={ICONS.DELETE} color={COLORS.WHITE} size={32} />
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

    )
  }
  return(

    <Swipeable
      renderRightActions={(_, dragX) => rightActions(dragX, title)}
    >
      <View style={styles.listRow}>
        <Icon
          name={done ? ICONS.TICK_FILLED : ICONS.UNTICK}
          size={24}
          style={{ marginTop: SPACING.SPACE_4 }}
          color={done ? tagColor : COLORS.BLACK_30}
          hitSlop={{
            left: 10, top: 10, right: 10, bottom: 10,
          }}
          onPress={onPress}
        />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(NAVIGATIONS.CREATE_TODO.name, { todoId: item.id })}
        >
          <View style={{ marginLeft: normalize(10), flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <CustomText style={{ textDecorationLine: done ? 'line-through' : 'none' }} size="medium_1" weight="bold">{title}</CustomText>
            </View>
            {/* <CustomText
              style={{ textDecorationLine: done ? 'line-through' : 'none', color: COLORS.BLACK_60 }}
              extraProps={{
                numberOfLines: 1,
                ellipsizeMode: 'tail',
              }}
            >
              {desc}
            </CustomText> */}
            {!isTodayTodo && (
            <CustomText color={theme.textSecondary} style={{ marginVertical: SPACING.SPACE_4 }} size="small" weight="bold">
              {getFormattedDateTime(time)}
            </CustomText>
            )}

          </View>
        </TouchableWithoutFeedback>

      </View>

    </Swipeable>

  )
}
const stylesheet = (theme, isDark) => StyleSheet.create({
  listRow: {
    backgroundColor: theme.bgPrimary,
    paddingVertical: SPACING.SPACE_20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: normalize(100),
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.BLUE_300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: normalize(100),
  },
  tagColorBar: {
    padding: normalize(5),
    borderRadius: 100,
    width: normalize(80),
    alignItems: 'center',
  },
})
export default withTheme(stylesheet)(TodoRow)

TodoRow.defaultProps = {
  item: {},
  title: '',
  done: false,
  onPress: null,
  time: (new Date()),
}

TodoRow.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
  done: PropTypes.bool,
  onPress: PropTypes.func,
  time: PropTypes.instanceOf(Date),
}
