
import React from 'react';
import './ListTodo.scss';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';


class ListTodo extends React.Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making videos' },
            { id: 'todo3', title: 'Fixing bugs' },
        ],
        edittodo: {}
    }

    addNewTodo = (todo) => {

        this.setState({
            listTodos: [...this.state.listTodos, todo],
        })
        toast.success("Add success!")
    }

    handleDeleteTodo = (todo) => {
        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !== todo.id);
        this.setState({
            listTodos: currentTodos
        })
        toast.success("Delete success!")
    }
    handleEditToDo = (todo) => {
        let { edittodo, listTodos } = this.state;

        let isEmptyObj = Object.keys(edittodo).length === 0;

        // save
        if (isEmptyObj === false && edittodo.id === todo.id) {
            let listTodosCopy = [...listTodos];
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            listTodosCopy[objIndex].title = edittodo.title;

            if (listTodosCopy[objIndex].title.length !== 0) {

                this.setState({
                    listTodos: listTodosCopy,
                    edittodo: {}
                })
                toast.success('Update thành công');
                return;
            }
            else {
                toast.error('Update thất bại');
            }
        }
        // edit
        this.setState({
            edittodo: todo
        })
    }
    handleOnchangeEditTodo = (event) => {
        let edittodoCopy = { ...this.state.edittodo };
        edittodoCopy.title = event.target.value;
        this.setState({
            edittodo: edittodoCopy
        })
    }

    render() {
        let { listTodos, edittodo } = this.state;
        let isEmptyObj = Object.keys(edittodo).length === 0;
        console.log(isEmptyObj);
        return (

            <div className="list-todo-container">
                <AddTodo
                    addNewTodo={this.addNewTodo}
                />
                <div className="list-todo-content">
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyObj === true ?
                                        <span> {index + 1} - {item.title} </span>
                                        :
                                        <>
                                            {edittodo.id === item.id ?
                                                <span> {index + 1} - <input
                                                    value={edittodo.title}
                                                    onChange={(event) => this.handleOnchangeEditTodo(event)}
                                                ></input> </span>
                                                :
                                                <span> {index + 1} - {item.title} </span>
                                            }
                                        </>

                                    }
                                    <button className="edit"
                                        onClick={() => this.handleEditToDo(item)}

                                    >{isEmptyObj === false && edittodo.id === item.id ?
                                        'Save' : 'Edit'}
                                    </button>
                                    <button className="delete"
                                        onClick={() => this.handleDeleteTodo(item)}
                                    >Delete</button>

                                </div>
                            )
                        })

                    }
                </div>

            </div>
        )
    }

}
export default ListTodo;