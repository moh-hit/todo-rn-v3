import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import {
  COLORS, DIMENSIONS, normalize, SPACING,
} from '../Theme'
import { PALETTE_COLORS } from '../Theme/style_consts'
import { withTheme } from '../Theme/ThemeProvider'

const ProgressBar = ({
  styles, completedPercent = 0, step, steps,
}) => {
  const barColor = completedPercent === 100 ? PALETTE_COLORS.GREEN
    : completedPercent > 75 ? PALETTE_COLORS.YELLOW
      : completedPercent > 50 ? PALETTE_COLORS.ORANGE : PALETTE_COLORS.RED
  const animatedValue = React.useRef(new Animated.Value(-1000)).current
  const reactive = React.useRef(new Animated.Value(-1000)).current

  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps)
  }, [width, step])

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ marginVertical: SPACING.SPACE_20 }}>
        <View
          onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width
            setWidth(newWidth)
          }}
          style={styles.fullBar}
        >
          <Animated.View
            style={[styles.completedBar, {
              width: '100%',
              backgroundColor: barColor,
              transform: [{
                translateX: animatedValue,
              }],
            }]}
          />
        </View>
      </View>
    </View>

  )
}

const stylesheet = () => StyleSheet.create({
  fullBar: {
    backgroundColor: COLORS.BLACK_80,
    width: DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL * 4,
    height: normalize(8),
    borderRadius: 100,
    overflow: 'hidden',
  },
  completedBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: normalize(8),
    borderRadius: 100,
  },
})

export default withTheme(stylesheet)(ProgressBar)
