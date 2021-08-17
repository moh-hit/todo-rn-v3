/**
 *   @akshay
 *   how to use
 *   <CustomText color="grey" size="large"></CustomText>
 */

import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import {
  COLORS, FONTS, FONTFAMILY,
} from '../Theme'
import { useTheme } from '../Theme/ThemeProvider'

const CustomText = ({
  style,
  color,
  weight,
  size,
  children,
  center,
  flex,
  extraProps,
}) => {
  const { theme } = useTheme()
  const fontFamily = FONTFAMILY[weight.toUpperCase()] || weight
  let extraStyles = {}
  if (center) {
    extraStyles = {
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    }
  }
  if (flex) {
    extraStyles = {
      ...extraStyles,
      flex,
    }
  }
  const styles = {
    fontFamily,
    fontSize: FONTS[size.toUpperCase()],
    ...extraStyles,
    textAlignVertical: 'center',
    color: COLORS[color?.toUpperCase()] || color || theme.textPrimary,
    paddingVertical: FONTS[size.toUpperCase()] * 0.18,
  }
  return (
    <Text
      style={[styles, style]}
      {...extraProps}
    >
      {children}
    </Text>
  )
}

CustomText.defaultProps = {
  weight: 'regular',
  size: 'regular',
  style: {},
  color: '',
  extraProps: {},
  center: false,
  flex: 0,
}

CustomText.propTypes = {
  weight: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  extraProps: PropTypes.object,
  center: PropTypes.bool,
  flex: PropTypes.number,
}

export default CustomText
