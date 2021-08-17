import React from 'react'
import {
  FlatList, StyleSheet, View, Animated, TouchableWithoutFeedback, ScrollView,
} from 'react-native'
import {
  ASSETS, COLORS, DIMENSIONS, ICONS, normalize,
} from '../../Theme'
import { PALETTE_COLORS } from '../../Theme/style_consts'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import Fab from '../../UI/Fab'
import HabitCard from '../../UI/HabitCard'
import Icon from '../../UI/Icon'
import ScreenHeader from '../../UI/ScreenHeader'
import { HEADER_TYPE_MAP } from '../../utils/consts'
import { CAROUSEL_DATA_MAP } from '../../utils/dummyData'
import { NAVIGATIONS } from '../../utils/navigationConstant'

const { EmptyContainer } = ASSETS

function Habit(props) {
  const { styles, navigation, theme } = props
  const data = CAROUSEL_DATA_MAP.filter(item => item.completed < item.outOf)

  const helperOpacity = React.useRef(new Animated.Value(1)).current

  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(helperOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }, 100000)

    return helperOpacity.setValue(1)
  }, [])

  const renderHabitCard = ({ item, index }) => {
    return (
      <HabitCard
        index={index}
        style={{ marginVertical: normalize(15) }}
        item={item}
        navigation={navigation}
      />
    )
  }

  const renderEmptyContainer = (headerType) => {
    const labelText = headerType === HEADER_TYPE_MAP.TODAY.id ? 'No Task For Today' : 'You are all caught up'
    return (
      <View style={{ marginVertical: 40, alignItems: 'center' }}>
        <EmptyContainer
          width={DIMENSIONS.WIDTH - 100}
          height={normalize(150)}
        />
        <CustomText style={{ marginVertical: 20 }} color={COLORS.BLACK_60} size="large" center>{labelText}</CustomText>
      </View>

    )
  }

  const renderActionButton = () => {
    return (
      <TouchableWithoutFeedback
        hitSlop={{
          left: 20, right: 20, top: 20, bottom: 20,
        }}
        onPress={() => navigation.navigate(NAVIGATIONS.ARCHIVED_HABITS.name)}
      >
        <Icon name={ICONS.ARCHIVE} size={24} color={theme.textPrimary} />
      </TouchableWithoutFeedback>

    )
  }

  return (
    < >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Habits"
          containerStyles={{ marginHorizontal: DIMENSIONS.SPACE_HORIZONTAL }}
          actionBarRenderer={renderActionButton}
        />
        { helperOpacity && (
        <Animated.Text style={[styles.helperText, { opacity: helperOpacity }]}>
          Double tap your habit card to finish today&apos;s habit
        </Animated.Text>
        )}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderHabitCard}
          keyExtractor={item => item.title}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: normalize(100) }}
          ListEmptyComponent={() => renderEmptyContainer(HEADER_TYPE_MAP.ALL.id)}
        />
      </ScrollView>
      <Fab
        color={PALETTE_COLORS.GREEN}
        onPress={() => navigation.navigate(NAVIGATIONS.CREATE_HABIT.name)}
      />
    </>
  )
}
const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
  },
  helperText: {
    fontSize: 14,
    color: COLORS.BLACK_60,
    marginHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
  },
})

export default withTheme(stylesheet)(Habit)
