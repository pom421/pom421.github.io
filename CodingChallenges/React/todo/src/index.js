import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"

class ListTodos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: props.todos ? props.todos : [],
            current: ""
        }   
    }

    onToggle(event) {
        const index = arguments[0]
        let todosClone = Object.assign({}, this.state.todos)
        todosClone[index].isFinished = !todosClone[index].isFinished
        this.setState(todosClone)
    }

    onChange(event) {
        this.setState({current: event.target.value})
    }

    addTodo() {
        let todosClone = this.state.todos.slice(0)
        todosClone.push({text: this.state.current, isFinished: false})
        this.setState({
            current: "",
            todos: todosClone
        })
    }

    removeFinishedTasks = () => {
        let todosClone = this.state.todos.slice(0)

        for (var len = todosClone.length, i = len - 1; i >= 0; i--) {
            debugger
            if (todosClone[i].isFinished) {
                todosClone.splice(i, 1)
            }
        }

        this.setState({
            todos: todosClone
        })
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <label>
                    Nouvelle tâche{" "}
                    <input type="text" value={this.state.current} onChange={this.onChange.bind(this)} autoFocus/>
                </label>
                
                <button onClick={this.addTodo.bind(this)}>OK</button>

                <h2>Liste des tâches</h2>
                <ul>
                    {todos.map((todo, index) => (
                        <div key={index} onClick={this.onToggle.bind(this, index)}>
                            <li >
                            <input type="checkbox" readOnly checked={todo.isFinished} /><span className={todo.isFinished ? "finished": ""}>{todo.text}</span></li>
                        </div>
                    ))}
                </ul>

                <button onClick={this.removeFinishedTasks}>Remove finished tasks</button>
            </div>
        )
    }
}

const todos = [
    {text: "faire les courses", isFinished: false},
    {text: "appeler le plombier", isFinished: true},
    {text: "faire du sport", isFinished: true},
]


ReactDOM.render(<ListTodos todos={todos}/>, document.getElementById('root'));
