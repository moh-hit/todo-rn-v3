import React, { useState, useRef } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import {
  normalize, SPACING, COLORS,
} from '../../Theme'
import { useTheme } from '../../Theme/ThemeProvider'
import HabitCard, { CAROUSEL_IMAGE_WIDTH } from '../HabitCard'

const CAROUSEL_ITEM_WIDTH = CAROUSEL_IMAGE_WIDTH

const DOT_WIDTH = normalize(8)
const DOT_HEIGHT = normalize(8)
const keyExtractor = item => `${item.title}`

const CustomCarousel = ({
  data = [], navigation,
}) => {
  const { styles } = useTheme(stylesheet)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const carouselRef = useRef()

  const renderItem = ({ item, index }) => {
    return <HabitCard navigation={navigation} index={index} item={item} />
  }
  const getItemLayout = (_, index) => (
    { length: CAROUSEL_ITEM_WIDTH, offset: CAROUSEL_ITEM_WIDTH * index, index }
  )
  return (
    <View style={{ marginVertical: normalize(10) }}>
      <Carousel
        ref={carouselRef}
        data={data}
        layout="default"
        sliderWidth={CAROUSEL_ITEM_WIDTH}
        itemWidth={CAROUSEL_ITEM_WIDTH}
        inactiveSlideScale={0.7}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => { return <ActivityIndicator /> }}
        onSnapToItem={setActiveSlideIndex}
        getItemLayout={getItemLayout}
        removeClippedSubviews
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlideIndex}
        dotStyle={styles.dotStyle}
        dotContainerStyle={styles.dotContainerStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.9}
        tappableDots
        carouselRef={carouselRef}
        containerStyle={styles.paginationContainerStyle}
        activeOpacity={0.6}
      />
    </View>
  )
}

const stylesheet = (theme, isDark) => StyleSheet.create({
  paginationContainerStyle: {
    paddingVertical: SPACING.SPACE_10,
    paddingHorizontal: 0,
  },
  dotContainerStyle: {
    width: DOT_WIDTH * 2,
    height: DOT_HEIGHT * 2,
    paddingHorizontal: 0,
    marginHorizontal: SPACING.SPACE_2,
  },
  dotStyle: {
    width: DOT_WIDTH,
    height: DOT_HEIGHT,
    borderRadius: DOT_WIDTH / 2,
    marginHorizontal: 0,
    backgroundColor: isDark ? COLORS.WHITE : COLORS.BLACK,
  },
  inactiveDotStyle: {
    backgroundColor: isDark ? COLORS.GREY : COLORS.GREY_100,
  },
})

export default CustomCarousel
