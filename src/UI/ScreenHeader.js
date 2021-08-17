import React from 'react'
import { View, StyleSheet } from 'react-native'
import Proptypes from 'prop-types'

import CustomText from './CustomText'
import Icon from './Icon'
import TouchableRipple from './TouchableRipple'

import { useTheme } from '../Theme/ThemeProvider'

import {
  DIMENSIONS, ICONS, COLORS, SPACING,
} from '../Theme'

const ScreenHeader = ({
  backPressHandler,
  title,
  actionBarRenderer,
  titleSize,
  showBackBtn,
  containerStyles,
  titleStyles,
}) => {
  const { styles, theme, isDark } = useTheme(stylesheet)
  return (
    <View style={[styles.container, { paddingLeft: 0 }, containerStyles]}>
      {showBackBtn ? (
        <TouchableRipple
          style={styles.backBtn}
          onPress={backPressHandler}
          hitSlop={{
            top: SPACING.SPACE_16,
            bottom: SPACING.SPACE_16,
            left: SPACING.SPACE_16,
            right: SPACING.SPACE_16,
          }}
          useForeground={false}
          borderless
          rippleColor={isDark ? COLORS.BLACK_100 : ''}
        >
          <View style={styles.iconWrapper}>
            <Icon name={ICONS.BACK} color={theme.textPrimary} size={32} />
          </View>
        </TouchableRipple>
      ) : (
        <View style={styles.backBtnPlaceHolder} />
      )}
      <CustomText
        style={[styles.title, titleStyles]}
        size={titleSize}
        weight="bold"
        flex={1}
        extraProps={{
          numberOfLines: 2,
          ellipsizeMode: 'tail',
        }}
      >
        {title}
      </CustomText>
      {actionBarRenderer ? actionBarRenderer() : null}
    </View>
  )
}

const stylesheet = theme => StyleSheet.create({
  container: {
    backgroundColor: theme.bgPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    height: DIMENSIONS.HEADER_HEIGHT,
  },
  title: {
    flex: 1,
    marginRight: SPACING.SPACE_20,
    // paddingBottom: SPACING.SPACE_16,
    // paddingTop: SPACING.SPACE_16,
    paddingVertical: 0,
  },
  backBtn: {
    paddingLeft: SPACING.SPACE_14,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    paddingLeft: SPACING.SPACE_2,
    paddingRight: SPACING.SPACE_4,
    paddingVertical: SPACING.SPACE_6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnPlaceHolder: {},
})

export default ScreenHeader

ScreenHeader.defaultProps = {
  titleSize: 'large_2',
  backPressHandler: () => null,
  showBackBtn: false,
  title: '',
  containerStyles: {},
  actionBarRenderer: () => null,
  titleStyles: {},
}

ScreenHeader.propTypes = {
  titleSize: Proptypes.string,
  backPressHandler: Proptypes.func,
  title: Proptypes.string,
  actionBarRenderer: Proptypes.func,
  showBackBtn: Proptypes.bool,
  containerStyles: Proptypes.oneOfType([Proptypes.array, Proptypes.object]),
  titleStyles: Proptypes.oneOfType([Proptypes.array, Proptypes.object]),
}
