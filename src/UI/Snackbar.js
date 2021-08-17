import React, { Component, createRef } from 'react'
import {
  View, Animated, StyleSheet, TouchableOpacity,
} from 'react-native'

import CustomText from './CustomText'
import {
  normalize, COLORS, DIMENSIONS, SPACING, shadowGenerator,
} from '../Theme'
import { withTheme } from '../Theme/ThemeProvider'
import { PALETTE_COLORS } from '../Theme/style_consts'

// In case snackbar isn't hiding properly incrase MAX_SNACKBAR_HEIGHT
const MARGIN_BOTTOM = normalize(DIMENSIONS.HEIGHT - 100)

const TRANSLATE_Y = (-MARGIN_BOTTOM)

export const snackbarRef = createRef()
export const modalSnackbarRef = createRef()

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

class Snackbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
    }
    this.isActive = false
    this.yPosition = new Animated.Value(TRANSLATE_Y)
    this.hideDelay = 0

    this.showAnimation = Animated.spring(this.yPosition, {
      // bounciness: 7,
      // speed: 6,
      bounciness: 1.5,
      speed: 2.5,
      toValue: 0,
      useNativeDriver: true,
    })
    this.hideAnimation = Animated.spring(this.yPosition, {
      // bounciness: 7,
      // speed: 6,
      bounciness: 1.5,
      speed: 2.5,
      toValue: TRANSLATE_Y,
      useNativeDriver: true,
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  showSnackbar = (msg = '', { showDelay = 0, hideDelay = 0 } = {}) => {
    if(this.isActive) {
      // In case any hide animations are waiting to be executed, then remove them by clearTimout
      // Immediately reset yPosition to initial value

      this.isActive = false
      clearTimeout(this.timeout)
      this.yPosition.setValue(TRANSLATE_Y)
      this.showSnackbar(msg, { showDelay, hideDelay })
    } else {
      this.isActive = true
      this.setState({ msg }, () => {
        Animated.spring(this.yPosition, {
          // bounciness: 7,
          // speed: 6,
          bounciness: 1.5,
          speed: 2.5,
          toValue: 0,
          // delay: showDelay,
          useNativeDriver: true,
        }).start()

        if(this.timeout) {
          clearTimeout(this.timeout)
        }
        this.hideDelay = hideDelay > 0 ? hideDelay : Math.max(msg.length * 60, 3000)
        this.timeout = setTimeout(() => { this.hideSnackbar({ hideDelay }) }, this.hideDelay)
      })
    }
  }

  hideSnackbar = () => {
    // if(this.isActive) {
    this.hideAnimation.start(() => {
      this.isActive = false
    })
    // }
  }

  render() {
    const { msg } = this.state
    const { styles } = this.props
    if (msg.length === 0) return null

    return (
      <AnimatedTouchableOpacity
        style={[styles.container, { transform: [{ translateY: this.yPosition }] }]}
        activeOpacity={1}
        onPress={() => { this.hideSnackbar() }}
      >
        <View style={styles.msgContainer}>
          <View style={{
            width: normalize(5), height: '100%', position: 'absolute', left: 0, top: 0, backgroundColor: PALETTE_COLORS.BLUE,
          }}
          />
          <CustomText
            size="medium"
            weight="bold"
            center
            style={styles.msg}
          >
            {msg}
          </CustomText>
        </View>
      </AnimatedTouchableOpacity>
    )
  }
}

const stylesheet = theme => StyleSheet.create({
  container: {
    // height: SNACKBAR_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // top: 0,
    left: 0,
    right: 0,
    bottom: MARGIN_BOTTOM,
    marginHorizontal: SPACING.SPACE_28 * 2,
    paddingHorizontal: SPACING.SPACE_10,
    backgroundColor: theme.bgSecondary,
    borderRadius: 8,
    zIndex: 2,
    ...shadowGenerator(12),
  },
  msgContainer: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    marginVertical: SPACING.SPACE_10,
  },
  msg: {
    opacity: 1,
  },
  contentContainer: {
    marginHorizontal: SPACING.SPACE_14,
    // marginBottom: SPACING.SPACE_12,
    paddingHorizontal: SPACING.SPACE_10,
    paddingVertical: SPACING.SPACE_12,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
  },
})

const SnackBarWithTheme = withTheme(stylesheet)(Snackbar)
const ModalSnackBarWithTheme = withTheme(stylesheet)(Snackbar)

const SnackBar = () => <SnackBarWithTheme ref={snackbarRef} />
const ModalSnackBar = () => <ModalSnackBarWithTheme ref={modalSnackbarRef} />

export { SnackBar as Snackbar, ModalSnackBar }

export const showSnackbar = (msg, options = {}) => {
  if(typeof msg !== 'string') {
    console.trace()
    return
  }
  if(options?.showDelay > 0) {
    setTimeout(() => showSnackbar(msg, { ...options, showDelay: 0 }), options?.showDelay)
  } else if(modalSnackbarRef.current) {
    modalSnackbarRef.current.showSnackbar(msg, options)
  } else if(snackbarRef.current) {
    snackbarRef.current.showSnackbar(msg, options)
  } else{
    console.warn('ref null')
  }
}
