import { connect } from 'react-redux'
import { fetchTodo, removeTodo } from '../Todo/actions'
import Home from './Home'

const mapStateToProps = (state) => {
  return {
    ...state,
    user_details: state.auth.user_details,
    isFetchingTodo: state.todo.isFetchingTodo,
    fetchTodoError: state.todo.fetchTodoError,
    todoData: state.todo.todoData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodayTodo: params => dispatch(fetchTodo(params)),
    removeTodo: params => dispatch(removeTodo(params)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
