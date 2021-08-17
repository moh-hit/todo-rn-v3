import React, { useState } from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import { changeDateTime } from '../../Screens/Todo/actions'
import {
  COLORS, DIMENSIONS, FONTFAMILY, normalize, SPACING,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import Button from '../../UI/Button'
import CounterToggler from '../../UI/CounterToggler'
import CustomText from '../../UI/CustomText'
import ScreenHeader from '../../UI/ScreenHeader'
import { AMPPM_MAP, HR_MAP, MIN_MAP } from '../../utils/consts'

const DateTimePicker = (props) => {
  const {
    styles, navigation, theme, route: { params }, setDateTime,
  } = props

  const [selectedDate, setSelectedDate] = useState(params?.time || null)
  const [time, setTime] = useState({
    hr: HR_MAP[0],
    min: MIN_MAP[0],
    ampm: AMPPM_MAP[0],
  })

  const onSelectDate = (date) => {
    setSelectedDate(date.dateString)
  }

  const onChangeTime = (timeType, value) => {
    setTime({ ...time, [timeType]: value })
  }

  const onSetDateTime = async () => {
    await setDateTime({ date: selectedDate, time })
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        showBackBtn
        backPressHandler={() => navigation.goBack()}
        title="Pick Date and Time"
        titleSize="large"
      />
      <View style={{ paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL }}>
        <Calendar
          current={new Date()}
          markedDates={{
            [selectedDate]:
            { selected: true },
          }}
          minDate={new Date()}
          onDayPress={day => onSelectDate(day)}
          monthFormat="MMM yyyy"
          disableAllTouchEventsForDisabledDays
        // renderArrow={direction => (<Arrow />)}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        // renderHeader={(date) => { /* Return JSX */ }}
          enableSwipeMonths
          disableArrowLeft
          hideExtraDays
          theme={{
            calendarBackground: theme.bgPrimary,
            textDisabledColor: theme.placeholderLightColor,
            dayTextColor: theme.textPrimary,
            //   textSectionTitleColor: theme.placeholderLightColor,
            selectedDayBackgroundColor: COLORS.CREATIVE_COLOR,
            selectedDayTextColor: COLORS.BLACK,
            todayTextColor: COLORS.RED,
            dotColor: COLORS.CREATIVE_COLOR,
            textMonthFontFamily: FONTFAMILY.BOLD,
            textDayFontFontFamily: FONTFAMILY.BOLD,
            textMonthFontSize: 24,
            textDayFontWeight: '600',
            arrowColor: COLORS.CREATIVE_COLOR,
            monthTextColor: COLORS.CREATIVE_COLOR,
          }}
        />
        <View style={{ marginVertical: DIMENSIONS.SPACE_VERTICAL }}>
          <CustomText size="medium_1">Select a time</CustomText>

          <View style={{
            flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: SPACING.SPACE_16,
          }}
          >
            <CounterToggler data={HR_MAP} onChangeTime={onChangeTime} timeType="hr" />
            <CounterToggler data={MIN_MAP} onChangeTime={onChangeTime} timeType="min" />
            <View style={{ marginTop: SPACING.SPACE_10 }}>
              <CounterToggler data={AMPPM_MAP} onChangeTime={onChangeTime} timeType="ampm" notCounter labelStyle={{ color: COLORS.CREATIVE_COLOR }} />
            </View>
          </View>
        </View>

      </View>
      <Button
        roundness={100}
        mode="contained"
        buttonColor={COLORS.CREATIVE_COLOR}
        labelColor={COLORS.WHITE}
        containerStyle={styles.button}
        onPress={onSetDateTime}
      >
        Done
      </Button>
    </View>
  )
}
const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
  },
  button: {
    width: normalize(150),
    alignSelf: 'center',
    height: normalize(40),
    position: 'absolute',
    bottom: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDateTime: data => dispatch(changeDateTime(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(stylesheet)(DateTimePicker))
