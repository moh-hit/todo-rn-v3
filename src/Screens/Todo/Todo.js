import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet, View, Keyboard,
} from 'react-native'
import { isEmpty, isEqual } from 'lodash'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  ASSETS,
  COLORS, DIMENSIONS, normalize,
} from '../../Theme'
import { ICONS } from '../../Theme/icons'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import CustomInput from '../../UI/CustomInput'
import Icon from '../../UI/Icon'
import TodoRow from '../../UI/TodoRow'
import ScreenHeader from '../../UI/ScreenHeader'
import TagPill from '../../UI/TagPill'
import { PALETTE_COLORS, SPACING } from '../../Theme/style_consts'
import { isFutureDate, isToday } from '../../utils/common'
import { TAGS_MAP } from '../../utils/dummyData'
import Fab from '../../UI/Fab'
import ModalDropdown from '../../UI/Dropdown/ModalDropdown'
import Button from '../../UI/Button'
import { CREATE_TODO_INPUT_MAP, SORT_TYPE_MAP } from '../../utils/consts'
import { showSnackbar } from '../../UI/Snackbar'
import TodoRowSkeleton from '../../UI/Skeletons/TodoRowSkeleton'
import CustomBackdrop from '../../UI/BottomSheet/CustomBackdrop.tsx'
import CustomBackground from '../../UI/BottomSheet/CustomBackground.tsx'

const { EmptyContainer } = ASSETS

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTodos: [],
      todos: [],
      bodyTitle: 'All Tasks',
      tagActive: 'All',
      sortType: SORT_TYPE_MAP.COMPLETED.id,
      refreshing: false,
      showFab: true,
      title: '',
      desc: '',
    }
    this.bottomSheetRef = React.createRef()
  }

  componentDidMount() {
    const { fetchTodayTodo, user_details } = this.props
    fetchTodayTodo({ user_uuid: user_details?.uid })
  }

  componentDidUpdate(prev) {
    const {
      todoData, isFetchingTodo, fetchTodoError,
      isTogglingDone, toggleTodoDone, toggleTodoDoneError,
      todoDeleted, isDeletingTodo, todoDeleteError,
    } = this.props
    const { tagActive } = this.state

    if(!isEqual(isFetchingTodo, prev.isFetchingTodo) && !isFetchingTodo && !isEmpty(todoData)) {
      this.setState({
        allTodos: todoData.sort((a, b) => { return a.done - b.done }).reverse(),
        todos: todoData,
        refreshing: false,
      }, () => {
        this.handleChangeTag(tagActive)
      })
    } else if(!isEqual(isFetchingTodo, prev.isFetchingTodo) && !isFetchingTodo && fetchTodoError) {
      showSnackbar(fetchTodoError)
      this.setState({ refreshing: false })
    }

    if(!isEqual(isTogglingDone, prev.isTogglingDone) && !isTogglingDone && toggleTodoDone) {
      showSnackbar('Todo updated')
    } else if(!isEqual(isTogglingDone, prev.isTogglingDone)
     && !isTogglingDone && toggleTodoDoneError) {
      showSnackbar(toggleTodoDoneError)
    }

    if(!isEqual(isDeletingTodo, prev.isDeletingTodo) && !isDeletingTodo && todoDeleted) {
      showSnackbar('Todo deleted')
    } else if(!isEqual(isDeletingTodo, prev.isDeletingTodo)
     && !isDeletingTodo && todoDeleteError) {
      showSnackbar(todoDeleteError)
    }
  }

  toggleDone = async (id, done) => {
    const { toggleDone } = this.props
    await toggleDone({ id, done })
    this.setState(prevState => ({
      todos: prevState.todos.map(
        obj => (obj._id === id ? Object.assign(obj, { done: !obj.done }) : obj),
      ),
    }))
  }

  handleRefresh = () => {
    const { fetchTodayTodo, user_details } = this.props
    this.setState({ refreshing: true })
    fetchTodayTodo({ user_uuid: user_details?.uid })
  }

  handleChangeTag(id) {
    const { allTodos, sortType } = this.state
    this.setState({ tagActive: id, bodyTitle: id })
    let filteredList = allTodos
    if(id === 'All') {
      this.setState({ todos: allTodos })
    } else if(id === 'Today') {
      filteredList = filteredList.filter((item) => {
        if(item) {
          return isToday(item.time)
        }
        return []
      })
    } else if(id === 'Upcoming') {
      filteredList = filteredList.filter((item) => {
        if(item) {
          return isFutureDate(item.time)
        }
        return []
      })
    } else {
      filteredList = filteredList.filter((item) => {
        if(item) {
          return item.tagId === id
        }
        return []
      })
    }
    this.setState({ todos: filteredList }, () => {
      this.handleSortTodo(sortType)
      filteredList = allTodos
    })
  }

  deleteTodo = async (id) => {
    const { allTodos, todos } = this.state
    const { removeTodo } = this.props
    const newList = allTodos.filter(item => item._id !== id)
    const newTodoList = todos.filter(item => item._id !== id)
    await removeTodo({ id })
    this.setState({ allTodos: newList, todos: newTodoList })
  }

  handleSortTodo = (sortType) => {
    const { todos } = this.state
    this.setState({ sortType })
    switch (sortType) {
      case SORT_TYPE_MAP.ATOZ.id:
        this.setState({ todos: todos.sort((a, b) => a.title.localeCompare(b.title)) })
        break
      case SORT_TYPE_MAP.ZTOA.id:
        this.setState({ todos: todos.sort((a, b) => a.title.localeCompare(b.title)).reverse() })
        break
      case SORT_TYPE_MAP.LATEST.id:
        this.setState({
          todos:
           todos.sort((a, b) => new Date(b.time) - new Date(a.time)).reverse(),
        })
        break
      case SORT_TYPE_MAP.OLDEST.id:
        this.setState({
          todos:
          todos.sort((a, b) => new Date(b.time) - new Date(a.time)),
        })
        break
      case SORT_TYPE_MAP.COMPLETED.id:
        this.setState({
          todos:
          todos.sort((a, b) => { return a.done - b.done }).reverse(),
        })
        break
      case SORT_TYPE_MAP.PENDING.id:
        this.setState({
          todos:
          todos.sort((a, b) => { return a.done - b.done }),
        })
        break
      default:
        break
    }
  }

  createTodo= () => {
    this.bottomSheetRef.current.snapToIndex(1)
  }

  handleonChangeSheet = (position) => {
    if(position === 0) {
      this.setState({ showFab: true })
      Keyboard.dismiss()
    } else{
      this.setState({ showFab: false })
    }
  }

  renderListRow = ({ item }) => {
    const { navigation } = this.props
    return (
      <TodoRow
        item={item}
        onPress={() => this.toggleDone(item._id, item.done)}
        onDelete={() => this.deleteTodo(item._id)}
        navigation={navigation}
      />
    )
  }

  renderEmptyContainer = () => {
    const { isFetchingTodo } = this.props

    if(isFetchingTodo) {
      return(
        <>
          <TodoRowSkeleton />
          <TodoRowSkeleton />
          <TodoRowSkeleton />
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
        <CustomText style={{ marginVertical: 20 }} color={COLORS.BLACK_60} size="large" center>All caught up here</CustomText>
      </View>

    )
  }

  renderListHeader = () => {
    const { theme } = this.props
    const { bodyTitle, sortType } = this.state

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <CustomText size="large_1" weight="bold">{bodyTitle}</CustomText>
        <ModalDropdown
          inputRenderer={() => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText size="medium" weight="bold" color={theme.textSecondary} style={{ marginHorizontal: normalize(5) }}>
                  Sort
                </CustomText>
                <Icon name={ICONS.SORT} size={20} color={theme.textSecondary} />
              </View>
            )
          }}
          selected={sortType}
          options={[{
            label: 'Sort by A-Z', value: 'az', icon: ICONS.ATOZ, iconSize: 18, iconColor: 'TEXT', optionSize: 'medium',
          },
          {
            label: 'Sort by Z-A', value: 'za', icon: ICONS.ZTOA, iconSize: 18, iconColor: 'TEXT', optionSize: 'medium',
          },
          {
            label: 'Sort by Latest', value: 'latest', icon: ICONS.LATEST, iconSize: 18, iconColor: 'TEXT', optionSize: 'medium',
          },
          {
            label: 'Sort by Oldest', value: 'oldest', icon: ICONS.OLDEST, iconSize: 20, iconColor: 'TEXT', optionSize: 'medium',
          },
          {
            label: 'Sort by Completed first', value: 'completed', icon: ICONS.TICK_SQUARE, iconSize: 18, iconColor: 'TEXT', optionSize: 'medium',
          },
          {
            label: 'Sort by Pending first', value: 'pending', icon: ICONS.UNTICK_SQUARE, iconSize: 18, iconColor: 'TEXT', optionSize: 'medium',
          }]}
          onChangeOption={value => this.handleSortTodo(value)}
          position="bottom"
          optionTitle="Sort Todo"
        />

      </View>
    )
  }

  renderTodoList = () => {
    const { styles, isFetchingTodo } = this.props
    const { todos, refreshing } = this.state
    return (
      <FlatList
        id="todoList"
        data={todos}
        refreshing={isFetchingTodo && refreshing}
        onRefresh={this.handleRefresh}
        renderItem={this.renderListRow}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={this.renderListHeader}
        ListEmptyComponent={this.renderEmptyContainer}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  renderTags = ({ item }) => {
    const { tagActive } = this.state
    return (
      <TagPill
        key={item.name}
        label={item.name}
        color={item.color}
        active={tagActive}
        onPress={() => this.handleChangeTag(item.name)}
      />
    )
  }

  renderActionButton = () => {
    return (
      <Button mode="text" labelStyle={{ fontSize: 18 }} labelColor={COLORS.CREATIVE_COLOR}>Select</Button>
    )
  }

  render() {
    const { styles } = this.props
    const { showFab } = this.state
    return (
      <View style={styles.container}>
        <ScreenHeader
          title="ToDo"
          containerStyles={{ marginHorizontal: DIMENSIONS.SPACE_HORIZONTAL }}
          // actionBarRenderer={this.renderActionButton}
        />
        <View>
          <FlatList
            id="tagList"
            horizontal
            data={TAGS_MAP}
            renderItem={this.renderTags}
            contentContainerStyle={{ marginBottom: SPACING.SPACE_10 }}
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
          />
          {this.renderTodoList()}
        </View>
        <BottomSheet
          ref={this.bottomSheetRef}
          index={-1}
          snapPoints={[0, '50%']}
          keyboardBehavior="interactive"
          animateOnMount
          enableHandlePanningGesture
          enableContentPanningGesture
          onChange={this.handleonChangeSheet}
          backgroundComponent={CustomBackground}
          backdropComponent={CustomBackdrop}
        >
          <View style={styles.createTodoSheet}>
            {Object.values(CREATE_TODO_INPUT_MAP).map((input) => {
              return (
                <View key={input.label} style={styles.inputContainer}>
                  <CustomText size="small" color={COLORS.BLACK_60}>{input.label}</CustomText>
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
          </View>
        </BottomSheet>
        {showFab && (
        <Fab
          color={PALETTE_COLORS.RED}
          onPress={this.createTodo}
        />
        )}
      </View>
    )
  }
}
const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
  },
  listContainer: {
    backgroundColor: theme.bgPrimary,
    marginVertical: DIMENSIONS.SPACE_VERTICAL,
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
    paddingBottom: 200,
  },
  createTodoSheet: {
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
    marginVertical: DIMENSIONS.SPACE_VERTICAL / 2,
  },
  inputContainer: {
    marginVertical: SPACING.SPACE_8,
  },
})

export default withTheme(stylesheet)(Todo)
