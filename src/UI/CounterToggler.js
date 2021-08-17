import React, { useState } from 'react'
import {
  Animated, FlatList, StyleSheet, View,
} from 'react-native'
import {
  COLORS, DIMENSIONS, FONTFAMILY, ICONS, normalize, SPACING,
} from '../Theme'
import { withTheme } from '../Theme/ThemeProvider'
import { AMPPM_MAP, HR_MAP, MIN_MAP } from '../utils/consts'
import CustomText from './CustomText'
import Icon from './Icon'

function CounterToggler(props) {
  const {
    styles, theme, data, onChangeTime, timeType, notCounter, labelStyle,
  } = props
  const scrollY = React.useRef(new Animated.Value(0)).current
  const ITEM_SIZE = DIMENSIONS.SPACE_VERTICAL * 3
  const ITEM_SPACING = DIMENSIONS.SPACE_VERTICAL / 2
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center', marginHorizontal: SPACING.SPACE_10 }]}>
      {!notCounter && <CustomText style={{ textTransform: 'uppercase' }}>{timeType}</CustomText>}
      {!notCounter && <Icon name={ICONS.UP_HEAD_FILLED} size={32} color={theme.textPrimary} />}
      <View
        style={{
          height: normalize(ITEM_SIZE) * 1.5,
          alignItems: 'center',
        }}
      >
        <Animated.FlatList
          data={data}
          bounces={false}
          onScroll={Animated.event(
            [{
              nativeEvent:
                { contentOffset: { y: scrollY } },
            }], { useNativeDriver: true },
          )}
          pagingEnabled
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.y / ITEM_SIZE)
            const mapdata = timeType === 'hr' ? HR_MAP : timeType === 'min' ? MIN_MAP : AMPPM_MAP
            onChangeTime(timeType, mapdata[index])
          }}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          style={{ flexGrow: 0 }}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: ITEM_SPACING }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ]
            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
            })
            return (
              <View style={{
                height: ITEM_SIZE,
              }}
              >
                <Animated.Text
                  style={[{
                    color: theme.textPrimary, opacity, fontSize: 48, textAlign: 'center', fontFamily: FONTFAMILY.BOLD,
                  }, labelStyle]}
                >
                  {item}
                </Animated.Text>
              </View>
            )
          }}
        />
      </View>
      {!notCounter && <Icon name={ICONS.DOWN_HEAD_FILLED} size={32} color={theme.textPrimary} />}

    </View>

  )
}
const stylesheet = theme => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.SPACE_16,
  },
  valueContainer: {
    padding: SPACING.SPACE_6,
    paddingHorizontal: SPACING.SPACE_16,
    marginVertical: SPACING.SPACE_10,
    backgroundColor: COLORS.BLACK_60,

  },
})
export default withTheme(stylesheet)(CounterToggler)
