import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'

// Components
import { ThemeProvider } from '@react-navigation/native'
import TouchableRipple from './TouchableRipple'
import Icon from './Icon'

// Constants
import {
  COLORS,
  FONTFAMILY,
  normalize,
  FONTS,
  SPACING,
} from '../Theme/style_consts'
import CustomText from './CustomText'
import { withTheme } from '../Theme/ThemeProvider'

class Button extends Component {
  render() {
    const {
      styles, // from withTheme
      isDark,
      disabled,
      compact,
      mode, // this can have following values "text", "outlined", "contained"
      loading,
      leftIconName, // can pass svg or fontIcon name
      rightIconName,
      isLeftIconSvg,
      isRightIconSvg,
      buttonColor,
      labelColor,
      rippleColor,
      darkText,
      children,
      uppercase,
      onPress,
      containerStyle,
      contentStyle,
      labelStyle,
      leftIconStyle,
      rightIconStyle,
      roundness,
      disableRipple,
      text,
      fullWidth,
      params,
      // underlayColor,
      ...otherProps
    } = this.props

    const LeftIcon = isLeftIconSvg ? leftIconName : ''
    const RightIcon = isRightIconSvg ? rightIconName : ''

    const font = { fontFamily: FONTFAMILY.BOLD }

    let backgroundColor; let borderColor; let textColor; let
      borderWidth; let calculatedRippleColor

    // Logic for determining background color of button
    if (mode === 'contained') {
      if (disabled) {
        backgroundColor = COLORS.GREY_100
      } else if (buttonColor) {
        backgroundColor = buttonColor
      } else {
        backgroundColor = COLORS.BLUE
      }
    } else if(mode === 'outlined') {
      backgroundColor = buttonColor || 'transparent'
    } else {
      backgroundColor = 'transparent'
    }
    // Logic for determining text color of button
    // if (disabled) {
    //   textColor = COLORS.WHITE
    // } else if(labelStyle.color) {
    //   textColor = labelStyle.color
    // } else if (labelColor) {
    //   textColor = labelColor
    // }
    if (mode === 'contained') {
      textColor = labelStyle?.color || labelColor || COLORS.WHITE
    } else if (mode === 'outlined') {
      textColor = labelStyle?.color || labelColor
    } else if(mode === 'text') {
      if(disabled) textColor = COLORS.GREY_100
      else textColor = labelStyle?.color || labelColor || ThemeProvider.textPrimary
    } else {
      textColor = COLORS.BLUE
    }
    // Logic for determining borderColor and borderWidth of button
    if (mode === 'text') {
      borderColor = 'transparent'
      borderWidth = 1
    } else if(mode === 'contained') {
      borderColor = backgroundColor
      borderWidth = 0
    } else {
      borderColor = textColor
      borderWidth = 2
    }

    // logic for determining rippleColor

    if(rippleColor) {
      calculatedRippleColor = rippleColor
    } else if(mode === 'text') {
      calculatedRippleColor = isDark ? COLORS.BLACK_100 : COLORS.SHADOW_GREY
    } else calculatedRippleColor = textColor

    const buttonStyle = {
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius: roundness,
    }
    let textViewStyle = {}
    if (fullWidth) {
      textViewStyle = { width: '100%' }
    }
    const touchableStyle = {
      borderRadius: containerStyle
        ? StyleSheet.flatten(containerStyle).borderRadius || roundness : roundness,
    }
    if (mode === 'text') {
      touchableStyle.borderRadius = StyleSheet.flatten(containerStyle).borderRadius || 6
    }

    const textStyle = { color: textColor, ...font }

    const finalOnPress = () => {
      if (disabled) return
      onPress(params)
    }

    let leftContent = null

    if(leftIconName) {
      let content
      if(loading) {
        content = (
          <View style={styles.icon}>
            <ActivityIndicator size="small" color={textColor} style={[leftIconStyle]} />
          </View>
        )
      } else {
        content = (
          <View style={styles.icon}>
            {isLeftIconSvg ? <LeftIcon style={[leftIconStyle]} />
              : <Icon name={leftIconName} size={22} color={textColor} style={[leftIconStyle]} />}
          </View>
        )
      }
      leftContent = content
    }

    return (
      <TouchableRipple
      // borderless
        borderless={!(mode === 'text')} // if borderless={false} is passed, on older devices the ripple doesn't animate. It shows like highlight
        delayPressIn={0}
        onPress={finalOnPress}
        disabled={disabled}
        rippleColor={calculatedRippleColor}
        disableRipple={disableRipple || disabled}
        // underlayColor={underlayColor}
        style={[mode === 'text' ? {} : styles.button, compact && styles.compact, buttonStyle, containerStyle, touchableStyle]}
        {...otherProps}
      >
        <View style={[styles.content, mode !== 'text' ? { flex: 1 } : { paddingHorizontal: disableRipple ? 0 : SPACING.SPACE_4 }, contentStyle]}>
          {leftContent}

          <View style={textViewStyle}>
            <CustomText
              numberOfLines={1}
              style={[mode === 'text' ? { fontSize: FONTS.SMALL_1 } : styles.label,
                compact && styles.compactLabel,
                uppercase && styles.uppercaseLabel,
                textStyle,
                labelStyle,
              ]}
              size="medium"
            >
              {text || children}
            </CustomText>
            {loading && !leftIconName ? <ActivityIndicator size="small" color={textColor} style={styles.loader} /> : null}
          </View>
          {rightIconName ? (
            <View>
              {isRightIconSvg ? <RightIcon style={[rightIconStyle]} />
                : <Icon name={rightIconName} size={9} color={textColor} style={[rightIconStyle]} />}
            </View>
          ) : null}
        </View>
      </TouchableRipple>
    )
  }
}

const stylesheet = () => StyleSheet.create({
  button: {
    justifyContent: 'center',
    minWidth: normalize(50),
    minHeight: normalize(30),
    borderStyle: 'solid',
    paddingHorizontal: SPACING.SPACE_10,
  },
  compact: {
    minWidth: 'auto',
    alignSelf: 'baseline',
  },
  content: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  icon: {
    // marginLeft: 12,
    width: normalize(35),
    marginRight: 8,
  },
  loader: {
    position: 'absolute',
    left: -SPACING.SPACE_36,
    top: 0,
    bottom: 0,

  },
  label: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTFAMILY.BOLD,
    // letterSpacing: 1,
    // marginVertical: 9,
    // marginHorizontal: 16,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
})

Button.defaultProps = {
  disabled: false,
  mode: 'text',
  loading: false,
  iconName: null,
  color: null,
  darkText: false,
  // children
  uppercase: false,
  onPress: undefined,
  containerStyle: {},
  contentStyle: {},
  labelStyle: {},
  roundness: 0,
  compact: false,
  disableRipple: false,
  fullWidth: false,
  children: '',
  // underlayColor,
  // ...rest
}

Button.propTypes = {
  disabled: PropTypes.bool,
  mode: PropTypes.oneOf(['text', 'outlined', 'contained']),
  compact: PropTypes.bool,
  loading: PropTypes.bool,
  iconName: PropTypes.string,
  color: PropTypes.string,
  darkText: PropTypes.bool,
  children: PropTypes.node,
  uppercase: PropTypes.bool,
  onPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  roundness: PropTypes.number,
  disableRipple: PropTypes.bool,
  fullWidth: PropTypes.bool,
  // underlayColor,
  // ...rest
}

export default withTheme(stylesheet)(Button)
