import React, { Component } from 'react'
import {
  FlatList, ScrollView, StyleSheet, View,
} from 'react-native'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import {
  COLORS, DIMENSIONS, ICONS, SPACING,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import CustomInput from '../../UI/CustomInput'
import ScreenHeader from '../../UI/ScreenHeader'
import { CREATE_TODO_INPUT_MAP } from '../../utils/consts'
import TagPill from '../../UI/TagPill'
import { normalize, PALETTE_COLORS } from '../../Theme/style_consts'
import Icon from '../../UI/Icon'
// import { HABIT_TODO_ICONS } from '../../Theme/icons'
import Button from '../../UI/Button'
import { TODO_MAP } from '../../utils/dummyData'
import { NAVIGATIONS } from '../../utils/navigationConstant'
import { formatDatePicker, getDateFormat, getFormattedDateTime } from '../../utils/common'
import { clearDateTime, createTodo } from '../../Screens/Todo/actions'
import { showSnackbar } from '../../UI/Snackbar'

const TAGS = [
  { name: 'Trip', color: PALETTE_COLORS.PINK },
  { name: 'Work', color: PALETTE_COLORS.RED },
  { name: 'Personal', color: PALETTE_COLORS.PURPLE },
]

class CreateTodo extends Component {
  constructor(props) {
    super(props)
    const { route: { params } } = props

    const data = TODO_MAP.filter(item => (item.id === params?.todoId))

    this.state = {
      title: data[0]?.title || '',
      desc: data[0]?.desc || '',
      tagId: data[0]?.tag || null,
      color: data[0]?.color || null,
      time: data[0]?.time || (new Date()),
    }
  }

  onChange = (value, field) => {
    this.setState({
      [field]: value,
    })
  }

  componentDidUpdate(prev) {
    const {
      createdTodo, isCreatingTodo, createTodoError, dateTimeData,
    } = this.props

    if(!isEqual(isCreatingTodo, prev.isCreatingTodo) && !isCreatingTodo && createdTodo) {
      showSnackbar('Created Todo Successfully')
      this.setState({
        title: '', desc: '', time: new Date(), tagId: null,
      })
    } else if(!isEqual(isCreatingTodo, prev.isCreatingTodo)
    && !isCreatingTodo && createTodoError && createdTodo) {
      showSnackbar(createTodoError)
    }
    if(!isEqual(dateTimeData, prev.dateTimeData) && dateTimeData) {
      const formattedDate = formatDatePicker(dateTimeData)
      this.setState({ time: formattedDate })
    }
  }

  routeDateTimePicker = () => {
    const { navigation } = this.props
    const { time } = this.state

    navigation.navigate(NAVIGATIONS.DATE_TIME_PICKER.name,
      { time: getDateFormat(time) })
  }

  createTodo = () => {
    const { addTodo, user_details } = this.props
    const {
      title, desc, tagId, time,
    } = this.state

    const addTodoParams = {
      title, desc, tagId, time: time.getTime(), user_uuid: user_details.uid, done: false,
    }

    addTodo(addTodoParams)
  }

  renderTags = ({ item }) => {
    const { tagId } = this.state
    return (
      <TagPill
        key={item.name}
        label={item.name}
        color={item.color}
        active={tagId}
        onPress={() => this.onChange(item.name, 'tagId')}
      />
    )
  }

  render() {
    const { styles, navigation } = this.props
    const { time } = this.state
    return (
      <View style={styles.container}>
        <ScreenHeader
          showBackBtn
          backPressHandler={() => navigation.goBack()}
          title="Create Todo Task"
          titleSize="large"
        />
        <ScrollView style={styles.inputsContainer}>
          {Object.values(CREATE_TODO_INPUT_MAP).map((input) => {
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
            <CustomText size="medium" color={COLORS.BLACK_60}>When is it for</CustomText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <CustomInput
                value={getFormattedDateTime(time) || ''}
                containerStyles={{ width: '90%' }}
                editable={false}
              />
              <Icon
                name={ICONS.CALENDER}
                color={COLORS.ORANGE}
                size={24}
                onPress={this.routeDateTimePicker}
              />
            </View>

          </View>
          <View style={styles.inputContainer}>
            <CustomText size="medium" color={COLORS.BLACK_60}>Assign a tag</CustomText>
            <FlatList
              horizontal
              data={TAGS}
              renderItem={this.renderTags}
              keyExtractor={item => item.name}
              contentContainerStyle={{ marginVertical: SPACING.SPACE_16 }}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={() => (
                <TagPill
                  color={COLORS.GOLDEN}
                  isAddTag
                />
              )}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <CustomText size="medium" color={COLORS.BLACK_60}>Pick color for your todo</CustomText>
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
                        {isSelected && <Icon name={ICONS.TICK} color={COLORS.WHITE} size={20} />}
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })}
              </View>
            </ScrollView>
          </View> */}
        </ScrollView>
        <Button
          roundness={100}
          mode="contained"
          buttonColor={COLORS.CREATIVE_COLOR}
          labelColor={COLORS.WHITE}
          containerStyle={styles.button}
          onPress={this.createTodo}
        >
          Create Todo
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
    user_details: state.auth.user_details,
    isCreatingTodo: state.todo.isCreatingTodo,
    createdTodo: state.todo.createdTodo,
    createTodoError: state.todo.createTodoError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearPrevDate: () => dispatch(clearDateTime()),
    addTodo: params => dispatch(createTodo(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(stylesheet)(CreateTodo))
