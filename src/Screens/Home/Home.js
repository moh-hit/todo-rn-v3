import React, { Component } from 'react'
import {
  FlatList,
  Image,
  ScrollView, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native'
import { isEmpty, isEqual } from 'lodash'
import {
  ASSETS,
  COLORS, DIMENSIONS, normalize,
} from '../../Theme'
import { PALETTE_COLORS } from '../../Theme/style_consts'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomCarousel from '../../UI/CustomCarousal'
import CustomText from '../../UI/CustomText'
import NoHabitCard from '../../UI/NoHabitCard'
import ScreenHeader from '../../UI/ScreenHeader'
import TodoRow from '../../UI/TodoRow'
import { HEADER_TYPE_MAP } from '../../utils/consts'
import { CAROUSEL_DATA_MAP } from '../../utils/dummyData'
import Fab from '../../UI/Fab'
import { NAVIGATIONS } from '../../utils/navigationConstant'
import { showSnackbar } from '../../UI/Snackbar'
import TodoRowSkeleton from '../../UI/Skeletons/TodoRowSkeleton'
import { isToday } from '../../utils/common'

const { EmptyContainer, Profile2 } = ASSETS
class Home extends Component {
  constructor(props) {
    super(props)
    const habits = CAROUSEL_DATA_MAP.filter((item) => {
      return item.completed < item.outOf
    })
    this.state = {
      todos: [],
      todaysData: false,
      habits,
    }
  }

  componentDidMount() {
    const { fetchTodayTodo, user_details } = this.props
    fetchTodayTodo({ user_uuid: user_details?.uid })
  }

  componentDidUpdate(prev) {
    const { todoData, isFetchingTodo, fetchTodoError } = this.props

    if(!isEqual(isFetchingTodo, prev.isFetchingTodo) && !isFetchingTodo && !isEmpty(todoData)) {
      const todayData = todoData.filter((item) => {
        if(item) {
          return isToday(item.time)
        }
        return []
      })
      const todos = todayData.length ? todayData : todoData
      this.setState({ todos, todaysData: todayData.length })
    } else if(!isEqual(isFetchingTodo, prev.isFetchingTodo) && !isFetchingTodo && fetchTodoError) {
      showSnackbar(fetchTodoError)
    }
  }

  toggleDone(id) {
    this.setState(prevState => ({
      todos: prevState.todos.map(
        obj => (obj.id === id ? Object.assign(obj, { done: !obj.done }) : obj),
      ),
    }))
  }

  deleteTodo = async (id) => {
    const { todos } = this.state
    const { removeTodo } = this.props
    const newTodoList = todos.filter(item => item._id !== id)
    await removeTodo({ id })
    this.setState({ todos: newTodoList })
  }

  profileButtonRenderer = () => {
    const { navigation } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(NAVIGATIONS.PROFILE.name)}>
        <Image style={{ width: 35, height: 35, borderRadius: 100 }} source={Profile2} />
      </TouchableWithoutFeedback>
    )
  }

  renderListRow = ({ item }) => {
    const { navigation } = this.props
    return (
      <TodoRow
        item={item}
        onPress={() => this.toggleDone(item._id)}
        onDelete={() => this.deleteTodo(item._id)}
        navigation={navigation}
        todoType="Today"
      />
    )
  }

  renderEmptyContainer = (headerType) => {
    const { isFetchingTodo } = this.props

    const labelText = headerType === HEADER_TYPE_MAP.TODAY.id ? 'No Task For Today' : 'You are all caught up'
    if(isFetchingTodo) {
      return(
        <>
          <TodoRowSkeleton />
          <TodoRowSkeleton />
          <TodoRowSkeleton />
        </>
      )
    }
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

  renderListHeader = (headerType) => {
    const { label } = HEADER_TYPE_MAP[headerType]

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <CustomText size="large_1">{label}</CustomText>
        {headerType === HEADER_TYPE_MAP.TODAY.id
        && <CustomText>{(new Date()).toDateString()}</CustomText>}
      </View>
    )
  }

  render() {
    const { styles, navigation } = this.props
    const { todos, habits, todaysData } = this.state

    return (
      <>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Hello Mohit" actionBarRenderer={this.profileButtonRenderer} />
          <CustomText size="large_1">Your Habits</CustomText>
          {habits.length ? <CustomCarousel navigation={navigation} data={habits} />
            : (<NoHabitCard />)}
          {todos.length && todaysData ? (
            <FlatList
              data={todos}
              renderItem={this.renderListRow}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.listContainer}
              ListHeaderComponent={this.renderListHeader(HEADER_TYPE_MAP.TODAY.id)}
              ListEmptyComponent={this.renderEmptyContainer(HEADER_TYPE_MAP.TODAY.id)}
            />
          ) : null}
          {!todaysData ? (
            <FlatList
              data={todos}
              renderItem={this.renderListRow}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.listContainer}
              ListHeaderComponent={this.renderListHeader(HEADER_TYPE_MAP.ALL.id)}
              ListEmptyComponent={this.renderEmptyContainer(HEADER_TYPE_MAP.ALL.id)}
            />
          ) : null}

        </ScrollView>
        <Fab
          color={PALETTE_COLORS.RED}
          onPress={() => navigation.navigate(NAVIGATIONS.CREATE_TODO.name)}
        />

      </>

    )
  }
}
const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
  },
  listContainer: {
    marginBottom: DIMENSIONS.SPACE_VERTICAL,
  },
})

export default withTheme(stylesheet)(Home)
