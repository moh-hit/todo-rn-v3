import { connect } from 'react-redux'
import { fetchTodo, removeTodo, toggleTodoDone } from './actions'
import Todo from './Todo'

const mapStateToProps = (state) => {
  return {
    ...state,
    user_details: state.auth.user_details,
    isFetchingTodo: state.todo.isFetchingTodo,
    fetchTodoError: state.todo.fetchTodoError,
    todoData: state.todo.todoData,
    isTogglingDone: state.todo.isTogglingDone,
    toggleTodoDoneError: state.todo.toggleTodoDoneError,
    toggleTodoDone: state.todo.toggleTodoDone,
    isDeletingTodo: state.todo.isDeletingTodo,
    todoDeleteError: state.todo.todoDeleteError,
    todoDeleted: state.todo.todoDeleted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodayTodo: params => dispatch(fetchTodo(params)),
    toggleDone: params => dispatch(toggleTodoDone(params)),
    removeTodo: params => dispatch(removeTodo(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
