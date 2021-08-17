import * as React from 'react'
import {
  Animated, View, StyleSheet,
} from 'react-native'
import {
  ASSETS, COLORS, DIMENSIONS, normalize,
} from '../../Theme'
import { PASTEL_COLORS } from '../../Theme/style_consts'
import { withTheme } from '../../Theme/ThemeProvider'
import Button from '../Button'
import CustomText from '../CustomText'

const {
  Onboarding4, Onboarding2, Onboarding3,
} = ASSETS
const { PURPLE, RED, GREEN } = PASTEL_COLORS

const bgs = [PURPLE, RED, GREEN]
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description: "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    Illustration: Onboarding2,
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description: 'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    Illustration: Onboarding4,

  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description: 'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    Illustration: Onboarding3,

  },
]

function Onboarding({ styles, onFinish }) {
  const scrollX = React.useRef(new Animated.Value(0)).current

  const Indicator = ({ scrollx }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {DATA.map((_, i) => {
          const inputRange = [(i - 1) * DIMENSIONS.WIDTH,
            i * DIMENSIONS.WIDTH, (i + 1) * DIMENSIONS.WIDTH]
          const scale = scrollx.interpolate({
            inputRange,
            outputRange: [0.8, 1.5, 0.8],
            extrapolate: 'clamp',
          })
          const opacity = scrollx.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          })
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{
                height: 8,
                width: 8,
                borderRadius: 5,
                backgroundColor: COLORS.BLACK_30,
                margin: 6,
                opacity,
                transform: [{ scale }],
              }}
            />
          )
        })}
      </View>
    )
  }

  const Backdrop = ({ scrollx }) => {
    const backgroundColor = scrollx.interpolate({
      inputRange: bgs.map((_, index) => index * DIMENSIONS.WIDTH),
      outputRange: bgs.map(bg => bg),
    })
    return (
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />
    )
  }

  const Circle = () => {
    return (
      <Animated.View
        style={{
          width: DIMENSIONS.HEIGHT,
          height: DIMENSIONS.HEIGHT,
          backgroundColor: COLORS.WHITE,
          borderRadius: DIMENSIONS.HEIGHT,
          position: 'absolute',
          top: -DIMENSIONS.HEIGHT * 0.4,
          left: -DIMENSIONS.HEIGHT * 0.33,
        }}
      />
    )
  }

  const renderItem = ({ item }) => {
    const { Illustration, title, description } = item
    return (
      <View style={styles.onboardingItem}>
        <View style={{ flex: 0.65, justifyContent: 'center' }}>
          <Illustration
            width={DIMENSIONS.WIDTH * 1.5}
            height={DIMENSIONS.HEIGHT}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <CustomText center color={COLORS.WHITE} size="large_1" weight="bold">{title}</CustomText>
          <CustomText center color={COLORS.WHITE}>{description}</CustomText>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Backdrop scrollx={scrollX} />
      <Circle />
      <Animated.FlatList
        data={DATA}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false })}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
      <View style={styles.buttonContainer}>
        <Button labelStyle={{ fontSize: 18, letterSpacing: 1.5 }} mode="text" onPress={onFinish} labelColor={COLORS.BLACK}>SKIP</Button>
        <Indicator scrollx={scrollX} />
        <Button labelStyle={{ fontSize: 18, letterSpacing: 1.5 }} mode="text" onPress={onFinish} labelColor={COLORS.BLACK}>START</Button>

      </View>
    </View>
  )
}

const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingItem: {
    alignItems: 'center',
    width: DIMENSIONS.WIDTH,
    padding: normalize(20),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: normalize(50),
    width: DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL * 2,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default withTheme(stylesheet)(Onboarding)
