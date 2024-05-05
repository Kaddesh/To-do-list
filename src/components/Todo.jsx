import { useEffect, useState } from 'react'
import './CSS/Todo.css'
import { useRef } from 'react';
import Todoitems from './Todoitems';

let count = 0;

const Todo = () => {
	const [todos, setTodos] = useState([])
	const inputRef = useRef(null);

	const add = () => {
		setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }])

		/*clear the input field data*/
		inputRef.current.value = "";
		localStorage.setItem("todos_count", count)
	}
	/*store data in local storage so it does not get removed*/
	useEffect(() => {
		setTodos(JSON.parse(localStorage.getItem("todos")))
		count = localStorage.getItem("todos_count")
	}, [])

	/*display todos in console when it gets updated by using console.log(todos)*/
	useEffect(() => {
		setTimeout(() => {
			console.log(todos)
			localStorage.setItem("todos", JSON.stringify(todos))
		})
	}, [todos])

	return (

		<div className='todo'>
			<div className="todo-header">
				To-Do-List
			</div>

			<div className='todo-add'>
				<input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
				<div onClick={() => { add() }} className="todo-add-btn" >Add</div>
			</div>

			<div className="todo-list">
				{todos.map((item, index) => {
					return <Todoitems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
				})}
			</div>
		</div>


	)
}

export default Todo