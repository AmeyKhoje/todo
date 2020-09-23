import * as actionTypes from './actionTypes'

const initialState = {
    todos: []
}

const reducerFunc = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TODO:
            return {
                ...state,
                todos: state.todos.concat({id: Math.random(),value: action.payload, completed: action.completed, date: action.date, status: action.status})
            }

        case actionTypes.UPDATE_TODO:
            const updateArr = state.todos.map(todo => 
                todo.id === action.payload.id ? { ...todo, value: action.payload.todo, status: action.payload.status } : todo
            )
            
            return {
                ...state,
                todos: updateArr
            }

        case actionTypes.DELETE_TODO:
            const updateDel = state.todos.filter(todo => todo.id !== action.payload.id)
            return {
                ...state,
                todos: updateDel
            }

        case actionTypes.CHANGE_STATUS:
            const updateT = state.todos.map(todo=> 
                todo.id === action.id ? { ...todo, completed: action.payload, status: action.status } : todo)
            return {
                ...state,
                todos: updateT
            }
        default:
            return state
    }
    return state
}

export default reducerFunc