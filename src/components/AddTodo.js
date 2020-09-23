import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Input, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Select, MenuItem, Tooltip, Checkbox } from '@material-ui/core'
import * as actionTypes from '../store/actionTypes'
import './AddTodo.css'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const AddTodo = (props) => {
    const [todo, setTodo] = useState({
        status: 'Select Status'
    })
    const [dialogOpen, setDialogOpen] = useState(false)
    const [toUpdate, setToUpdate] = useState({
        id: '', todo: ''
    })
    const [filter, setFilter] = useState('All')
    const [date, setDate] = useState(new Date())

    const changeHandler = (e) => {
        let value = e.target.value
        setTodo({
            ...todo,
            [e.target.name]: value
        })
    }

    const updateChangeHandler = (e) => {
        let value = e.target.value
        setToUpdate({
            ...toUpdate,
            [e.target.name]: value,
        })
    }

    const addTodoHandler = (e) => {
        e.preventDefault()
        if(!todo.todo || todo.todo.length === 0) {
            toast.info('Todo name cannot be empty. Please fill todo name', {
                position: 'top-center'
            })
        }
        else if(/^[a-zA-Z\s]*$/.test(todo.todo)) {
            props.onAddHandler(todo, date)
            setTodo({
                ...todo,
                todo: '',
                status: 'Select Status'
            })
            setDate(new Date())
        }
        else {
            toast.error('Only letters will be accepted in todo name, please enter only letters', {
                position: 'top-center'
            })
        }
    }

    const updateTodoHandler = (e) => {
        e.preventDefault()
        if(!toUpdate.todo || toUpdate.todo.length === 0) {
            toast.info('Todo name cannot be empty. Please fill todo name', {
                position: 'top-center'
            })
        }
        else if (/^[a-zA-Z\s]+$/.test(toUpdate.todo)) {
            props.onUpdateHandler(toUpdate)
            setDialogOpen(!dialogOpen)
        }
        else {
            toast.error('Only letters will be accepted in todo name, please enter only letters', {
                position: 'top-center'
            })
        }
    }

    const filterChangeHandler = (e) => {
        setFilter(e.target.value)
    }
    
    const handleDateChange = (e) => {
        setDate(e)
    }

    if(props.todos.length > 0) {
        props.todos.map(todo => {
            console.log(todo.date);
        })
    }
    else {}

    return (
        <div className="todo-main">
            <form>
                <div className="w-100 d-flex">
                    <Input onChange={changeHandler} style={{ marginRight: 7 }} name="todo" value={todo && todo.todo} className="w-60" placeholder="Enter your todo" autoFocus />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            className="date"
                            style={{ marginRight: 7 }}
                            format="dd/MM/yyyy"
                            value={date}
                            onChange={handleDateChange}
                            
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button 
                        type="submit"
                        variant="contained"  
                        color="primary" 
                        onClick={addTodoHandler}>Click</Button>
                </div>
            </form>

            { 
                props.todos.length > 0 && 
                <div className="w-100">
                    <div className="w-100 d-flex mt-20">
                        <div>
                            <span>Filter by status</span>
                        </div>
                        <Select value={filter} onChange={filterChangeHandler} name="filter">
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </div>
                </div>
            }

            {
                (props.todos && props.todos.length > 0 && filter === 'All') && <List aria-label="secondary" className="mt-20">
                    {
                        props.todos.map(todo => (
                            <ListItem className={`todo-list_item mb-10 ${todo.completed ? 'todo-list_item-done' : 'todo-list_item-progress'}`} key={todo.id}>
                                <Tooltip title={<h6 style={{ fontSize: 14, lineHeight: 1, margin: '3px 0' , fontWeight: 300, fontFamily: 'Poppins', borderRadius: 0 }}>{todo.completed ? 'Mark as Active' : 'Mark as Completed'}</h6>} arrow>
                                    <Checkbox checked={todo.completed} onChange={() => props.onChangeStatus(!todo.completed, todo)} />
                                </Tooltip>
                                
                                <ListItemText primary={todo.value} className='text-todo f-14' />
                                <ListItemText primary={todo.status} className="status-todo f-14" /> 
                                <ListItemText primary={`${todo.date.getDate()}/${todo.date.getMonth()}/${todo.date.getFullYear()}`} className="status-todo f-14" /> 
                                <Tooltip title={<h6 style={{ fontSize: 14, lineHeight: 1, margin: '3px 0' , fontWeight: 300, fontFamily: 'Poppins' }}>Edit</h6>} arrow>
                                    <IconButton color="inherit" style={{ marginRight: 7 }} onClick={() => {setToUpdate({ id: todo.id, todo: todo.value, status: todo.status }); setDialogOpen(true)}}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={<h6 style={{ fontSize: 14, lineHeight: 1, margin: '3px 0' , fontWeight: 300, fontFamily: 'Poppins' }}>Delete</h6>} arrow>
                                    <IconButton color="secondary" onClick={() => props.onDeleteTodo(todo)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))
                    }
                </List>
            }

            {
                (props.todos !== null && filter !== 'All') && <List aria-label="secondary" className="mt-20">
                    {
                        props.todos.filter(todo => todo.status === filter).map(todo => (
                            <ListItem className={`todo-list_item mb-10 ${todo.completed ? 'todo-list_item-done' : 'todo-list_item-progress'}`} key={todo.id}>
                                <Tooltip title={<h6 style={{ fontSize: 14, lineHeight: 1, margin: '3px 0' , fontWeight: 300, fontFamily: 'Poppins', borderRadius: 0 }}>{todo.completed ? 'Mark as Active' : 'Mark as Completed'}</h6>} arrow>
                                    <Checkbox checked={todo.completed} onChange={() => props.onChangeStatus(!todo.completed, todo)} />
                                </Tooltip>
                                
                                <ListItemText primary={todo.value} className='text-todo f-14' />
                                <ListItemText primary={todo.status} className="status-todo f-14" /> 
                                <ListItemText primary={`${todo.date.getDate()}/${todo.date.getMonth()}/${todo.date.getFullYear()}`} className="status-todo f-14" /> 
                                <Tooltip title={<h6 style={{ fontSize: 14, lineHeight: 1, margin: '3px 0' , fontWeight: 300, fontFamily: 'Poppins' }}>Edit</h6>} arrow>
                                    <IconButton color="inherit" style={{ marginRight: 7 }} onClick={() => {setToUpdate({ id: todo.id, todo: todo.value, status: todo.status }); setDialogOpen(true)}}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={<h6 style={{ fontSize: 14, lineHeight: 1, margin: '3px 0' , fontWeight: 300, fontFamily: 'Poppins' }}>Delete</h6>} arrow>
                                    <IconButton color="secondary" onClick={() => props.onDeleteTodo(todo)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))
                    }
                </List>
            }

            <Dialog open={dialogOpen} onBackdropClick={() => setDialogOpen(!dialogOpen)}>
                <DialogTitle>Update Todo</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="w-100 d-flex">
                            <Input onChange={updateChangeHandler} name="todo" value={toUpdate.todo} className="w-80 mr-15" placeholder="Enter your todo" autoFocus />
                            <Button 
                                type="submit"
                                variant="contained"  
                                color="primary" 
                                onClick={updateTodoHandler}>Click</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        onAddHandler: (item, date) => {
            dispatch({ type: actionTypes.ADD_TODO, payload: item.todo, completed: false, date: date, status: 'Active' })
        },
        onUpdateHandler: (item) => {
            dispatch({ type: actionTypes.UPDATE_TODO, payload: item })
        },
        onDeleteTodo: (item) => {
            dispatch({ type: actionTypes.DELETE_TODO, payload: item })
        },
        onChangeStatus: (status, todo) => {
            if(todo.status === 'Active') {
                dispatch({ type: actionTypes.CHANGE_STATUS, payload: status, id: todo.id, status: 'Completed' })
            }
            else {
                dispatch({ type: actionTypes.CHANGE_STATUS, payload: status, id: todo.id, status: 'Active' })
            }
            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
