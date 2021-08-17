import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'
import DoubleTap from './DoubleTap'
import { useTheme } from '../Theme/ThemeProvider'
import CustomText from './CustomText'
import ProgressBar from './ProgressBar'
import { COLORS, DIMENSIONS, normalize } from '../Theme'
import Icon from './Icon'
import { showSnackbar } from './Snackbar'
import { PASTEL_COLORS, SPACING } from '../Theme/style_consts'
import { NAVIGATIONS } from '../utils/navigationConstant'
import { HABIT_TODO_ICONS, ICONS } from '../Theme/icons'
import ModalDropdown from './Dropdown/ModalDropdown'
import { HABIT_ROUTINE_MAP } from '../utils/consts'

export const CAROUSEL_IMAGE_WIDTH = normalize(400)

const HabitCard = ({
  item, style, archived, navigation,
}) => {
  const {
    title, bgColor, icon, completed, outOf, code, routine,
  } = item
  const { styles, theme, isDark } = useTheme(stylesheet)
  const scaleCard = React.useRef(new Animated.Value(1)).current
  const [completedAmount, setCompleted] = React.useState(completed)
  const [newRoutine, setNewRoutine] = React.useState(routine)
  const completedPercent = (completedAmount / outOf) * 100

  const handleCompleteHabit = () => {
    // ReactNativeHaptic.generate('impactMedium')
    if (!archived) {
      Animated.timing(scaleCard, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scaleCard, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start()
      })
      if (completedAmount < outOf) {
        setCompleted(completedAmount + 1)
        showSnackbar(`+1 to ${title}`)
      } else {
        showSnackbar('This Habit is completed.')
      }
    }
    return 1
  }

  const handleChangeRoutine = (value) => {
    setNewRoutine(value)
  }

  return (
    <DoubleTap
      doubleTap={handleCompleteHabit}
      singleTap={() => navigation.navigate(NAVIGATIONS.CREATE_HABIT.name, { habitId: item.id })}
      delay={200}
    >
      <Animated.View
        style={[
          styles.container,
          style,
          {
            backgroundColor: PASTEL_COLORS[bgColor],
            transform: [{ scale: scaleCard }],
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: 'transparent' }]}>
          <Icon
            name={HABIT_TODO_ICONS[icon].name}
            style={{ opacity: isDark ? 0.1 : 0.5 }}
            size={120}
            color={theme.bgPrimary}
          />
        </View>
        <CustomText
          size="large_1"
          weight="bold"
          color={COLORS.BLACK}
          style={{ maxWidth: DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL * 6 }}
          extraProps={{
            numberOfLines: 1,
          }}
        >
          {title}
        </CustomText>
        <CustomText color={COLORS.BLACK_30} size="medium">
          {`${completedAmount} ${code} out of ${outOf} completed.`}
        </CustomText>
        {!archived && (
          <ProgressBar
            step={completedAmount}
            steps={outOf}
            completedPercent={completedPercent}
          />
        )}
        {archived && (
          <ModalDropdown
            inputRenderer={() => {
              return (
                <View style={styles.button}>
                  <CustomText color={COLORS.BLACK_100}>
                    Extend
                  </CustomText>
                </View>
              )
            }}
            showButton
            buttonTitle="Extend habit"
            onSheetButtonPress={() => handleChangeRoutine(newRoutine)}
            selected={newRoutine}
            options={[
              {
                label: HABIT_ROUTINE_MAP.HOUR.label,
                value: HABIT_ROUTINE_MAP.HOUR.value,
                icon: ICONS.LATEST,
                iconSize: 18,
                iconColor: 'TEXT',
                optionSize: 'medium',
              },
              {
                label: HABIT_ROUTINE_MAP.DAY.label,
                value: HABIT_ROUTINE_MAP.DAY.value,
                icon: ICONS.LATEST,
                iconSize: 18,
                iconColor: 'TEXT',
                optionSize: 'medium',
              },
              {
                label: HABIT_ROUTINE_MAP.WEEK.label,
                value: HABIT_ROUTINE_MAP.WEEK.value,
                icon: ICONS.LATEST,
                iconSize: 20,
                iconColor: 'TEXT',
                optionSize: 'medium',
              },
              {
                label: HABIT_ROUTINE_MAP.TWICEWEEK.label,
                value: HABIT_ROUTINE_MAP.TWICEWEEK.value,
                icon: ICONS.LATEST,
                iconSize: 18,
                iconColor: 'TEXT',
                optionSize: 'medium',
              },
              {
                label: HABIT_ROUTINE_MAP.MONTH.label,
                value: HABIT_ROUTINE_MAP.MONTH.value,
                icon: ICONS.LATEST,
                iconSize: 18,
                iconColor: 'TEXT',
                optionSize: 'medium',
              },
              {
                label: HABIT_ROUTINE_MAP.THRICEMONTH.label,
                value: HABIT_ROUTINE_MAP.THRICEMONTH.value,
                icon: ICONS.LATEST,
                iconSize: 18,
                iconColor: 'TEXT',
                optionSize: 'medium',
              },
            ]}
            onChangeOption={value => setNewRoutine(value)}
            position="bottom"
            optionTitle="Extend your habit routine"
          />
        )}
      </Animated.View>
    </DoubleTap>
  )
}

export default HabitCard

const stylesheet = theme => StyleSheet.create({
  container: {
    borderRadius: 12,
    width: DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL * 2,
    paddingHorizontal: normalize(20),
    paddingVertical: DIMENSIONS.SPACE_VERTICAL,
    backgroundColor: theme.bgTertiary,
  },
  iconContainer: {
    position: 'absolute',
    right: -50,
    bottom: 0,
    borderRadius: 100,
    padding: normalize(15),
  },
  button: {
    width: normalize(120),
    height: normalize(40),
    marginTop: SPACING.SPACE_16,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.BLACK_30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

HabitCard.defaultProps = {
  title: '',
  style: {},
  bgColor: COLORS.BLACK_200,
  completed: 0,
  outOf: 0,
}

HabitCard.propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bgColor: PropTypes.string,
  completed: PropTypes.number,
  outOf: PropTypes.number,
}
