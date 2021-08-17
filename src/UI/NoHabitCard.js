import React from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import CustomText from './CustomText'
import {
  ASSETS, COLORS, DIMENSIONS, normalize,
} from '../Theme'
import Button from './Button'
import { useTheme } from '../Theme/ThemeProvider'

export const CAROUSEL_IMAGE_WIDTH = normalize(400)

// eslint-disable-next-line import/prefer-default-export
const NoHabitCard = () => {
  const { CreateHabits } = ASSETS
  const { styles } = useTheme(stylesheet)

  return (
    <View style={styles.cardContainer}>
      <View style={{ justifyContent: 'space-between' }}>
        <CustomText style={{ marginBottom: normalize(30) }} color={COLORS.BLACK_60} size="medium_1" center>
          Let&apos;s create a habit
        </CustomText>
        <Button
          containerStyle={{ backgroundColor: COLORS.CREATIVE_COLOR, padding: 5 }}
          labelStyle={{ color: COLORS.BLACK }}
          roundness={100}
          mode="contained"
        >
          Create new Habit
        </Button>
      </View>
      <CreateHabits
        width={normalize(130)}
        height={normalize(100)}
      />
    </View>
  )
}

export default NoHabitCard

const stylesheet = theme => StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    width: DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL * 2,
    paddingHorizontal: normalize(20),
    paddingVertical: DIMENSIONS.SPACE_VERTICAL,
    backgroundColor: theme.bgTertiary,
    marginVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
