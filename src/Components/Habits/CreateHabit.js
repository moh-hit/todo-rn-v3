import React, { Component } from 'react'
import {
  FlatList,
  ScrollView, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native'
import { connect } from 'react-redux'
import {
  COLORS, DIMENSIONS, ICONS, SPACING,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import CustomInput from '../../UI/CustomInput'
import ScreenHeader from '../../UI/ScreenHeader'
import { CREATE_HABIT_INPUT_MAP, CREATE_TODO_INPUT_MAP, HABIT_ROUTINE_MAP } from '../../utils/consts'
import { normalize, PALETTE_COLORS } from '../../Theme/style_consts'
import Icon from '../../UI/Icon'
import Button from '../../UI/Button'
import { CAROUSEL_DATA_MAP } from '../../utils/dummyData'
import { clearDateTime } from '../../Screens/Todo/actions'
import { HABIT_TODO_ICONS } from '../../Theme/icons'
import TagPill from '../../UI/TagPill'

class CreateHabit extends Component {
  constructor(props) {
    super(props)
    const { route: { params } } = props

    const data = CAROUSEL_DATA_MAP.filter(item => (item.id === params?.habitId))

    this.state = {
      name: data[0]?.title || '',
      description: data[0]?.desc || '',
      tag: data[0]?.tag || null,
      color: data[0] ? PALETTE_COLORS[data[0]?.bgColor] : null,
      icon: data[0] ? HABIT_TODO_ICONS[data[0]?.icon].name : null,
      routine: data[0]?.routine || null,
    }
  }

  onChange = (value, field) => {
    this.setState({
      [field]: value,
    })
  }

  renderTags = ({ item }) => {
    const { routine } = this.state
    const { theme } = this.props

    return (
      <TagPill
        key={item.value}
        label={item.label}
        color={theme.textPrimary}
        active={routine}
        value={item.value}
        noColor
        onPress={() => this.onChange(item.value, 'routine')}
      />
    )
  }

  render() {
    const { styles, navigation, theme } = this.props
    const { icon, color } = this.state
    return (
      <View style={styles.container}>
        <ScreenHeader
          showBackBtn
          backPressHandler={() => navigation.goBack()}
          title="Create a habit"
          titleSize="large"
        />
        <ScrollView style={styles.inputsContainer}>
          {Object.values(CREATE_HABIT_INPUT_MAP).map((input) => {
            return (
              <View key={input.label} style={styles.inputContainer}>
                <CustomText size="medium" color={COLORS.BLACK_60}>{input.label}</CustomText>
                <CustomInput
                  onChangeText={this.onChange}
                  inputKey={input.value}
                  // eslint-disable-next-line react/destructuring-assignment
                  value={this.state[input.value]}
                  inputStyles={input.style}
                  inputProps={{
                    multiline: input.value === CREATE_TODO_INPUT_MAP.TODO_DESC.value,
                  }}
                />
              </View>
            )
          })}
          <View style={styles.inputContainer}>
            <CustomText size="medium" color={COLORS.BLACK_60}>How often are you going to do this</CustomText>
            <FlatList
              horizontal
              data={Object.values(HABIT_ROUTINE_MAP)}
              renderItem={this.renderTags}
              keyExtractor={item => item.label}
              contentContainerStyle={{ marginVertical: SPACING.SPACE_16 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomText size="medium" color={COLORS.BLACK_60}>Pick color for your habit</CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', marginVertical: SPACING.SPACE_16 }}>
                {Object.values(PALETTE_COLORS).map((item) => {
                  const isSelected = item === color
                  const size = isSelected ? 40 : 35
                  return (
                    <TouchableWithoutFeedback
                      key={item}
                      onPress={() => this.onChange(item, 'color')}
                    >
                      <View
                        style={{
                          backgroundColor: item,
                          width: normalize(size),
                          height: normalize(size),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 100,
                          marginHorizontal: SPACING.SPACE_10,
                        }}
                      >
                        {isSelected && (
                        <Icon
                          name={ICONS.TICK}
                          color={COLORS.BLACK_100}
                          size={20}
                        />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })}
              </View>
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <CustomText size="medium" color={COLORS.BLACK_60}>Pick an icon for your habit</CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', marginVertical: SPACING.SPACE_16 }}>
                {Object.values(HABIT_TODO_ICONS).map((item) => {
                  const isSelected = item.name === icon
                  const size = isSelected ? 40 : 20
                  return (
                    <TouchableWithoutFeedback
                      key={item.id}
                      onPress={() => this.onChange(item.id, 'icon')}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: SPACING.SPACE_16,
                        }}
                      >
                        <Icon name={item.name} color={theme.textPrimary} size={size} />
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <Button
          roundness={100}
          mode="contained"
          buttonColor={COLORS.CREATIVE_COLOR}
          labelColor={COLORS.WHITE}
          containerStyle={styles.button}
        >
          Create Habit
        </Button>
      </View>
    )
  }
}
const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,

  },
  inputsContainer: {
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
    marginVertical: DIMENSIONS.SPACE_VERTICAL,
  },
  inputContainer: {
    marginVertical: SPACING.SPACE_16,
  },
  button: {
    width: normalize(150),
    alignSelf: 'center',
    height: normalize(40),
    position: 'absolute',
    bottom: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: SPACING.SPACE_10,
  },
})

const mapStateToProps = (state) => {
  return {
    dateTimeData: state.todo.dateTimeData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearPrevDate: () => dispatch(clearDateTime()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(stylesheet)(CreateHabit))
