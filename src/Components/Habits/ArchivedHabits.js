import React from 'react'
import {
  FlatList, StyleSheet, View, Animated,
} from 'react-native'
import {
  ASSETS, COLORS, DIMENSIONS, normalize,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import HabitCard from '../../UI/HabitCard'
import ScreenHeader from '../../UI/ScreenHeader'
import { HEADER_TYPE_MAP } from '../../utils/consts'
import { CAROUSEL_DATA_MAP } from '../../utils/dummyData'

const { EmptyContainer } = ASSETS

function ArchivedHabits(props) {
  const { styles, navigation } = props
  const data = CAROUSEL_DATA_MAP.filter(item => item.completed === item.outOf)
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

  const renderHabitCard = ({ item }) => {
    return (
      <HabitCard
        index={item.id}
        style={{ marginVertical: normalize(15) }}
        item={item}
        archived
        navigation={navigation}
      />
    )
  }

  const renderEmptyContainer = () => {
    const labelText = 'No completed habit found'
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

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Archived Habits"
        titleSize="large"
        showBackBtn
        backPressHandler={() => navigation.goBack()}
      />
      { helperOpacity && (
      <Animated.Text style={[styles.helperText, { opacity: helperOpacity }]}>
        All your completed habits will be present here.
      </Animated.Text>
      )}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderHabitCard({ item })}
        keyExtractor={item => item.id}
        contentContainerStyle={{ alignItems: 'center' }}
        ListEmptyComponent={() => renderEmptyContainer(HEADER_TYPE_MAP.ALL.id)}
      />

    </View>
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

export default withTheme(stylesheet)(ArchivedHabits)
