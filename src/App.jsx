
import { useEffect, useRef, useState } from 'react'
import './App.css'

const App = () => {
    const [inputVal, setInputVal] = useState('')
    let TodoFromLocalStorage = JSON.parse(localStorage.getItem("todos")) || []
    const [todos, setTodos] = useState(TodoFromLocalStorage)
    const [toggleBtn, setToggleBtn] = useState(true)
    const [getId, setGetid] = useState(null)
    const inputRef = useRef(null)
    



    const handleAdd = () => {
        if (inputVal.length > 0) {
            setTodos((prevTodos) => {
                return [{id: crypto.randomUUID(), title:inputVal, completed:false}, ...prevTodos]
            })
            setInputVal('')
        }
    }

    const toggleCheck = (id, completed)=>{
        setTodos(prev => {
            return prev.map(todo =>{
                if(todo.id === id){
                    return {...todo, completed}

                }
                return todo
            })
        })
    }

    const handleDel = (i) => {
        setTodos(prevTodos => prevTodos.filter((prevtodo, prevTodoIndex) => {
            return prevTodoIndex != i
        }))
    }

    const handleEdit = (todo, i) => {
        inputRef.current.focus()
        setGetid(i)
        setInputVal(todo)
        setToggleBtn(false)
    }

    const handleUpdate = () => {
        if (inputVal.length > 0) {
            const rcd = [...todos]
            rcd[getId].title = inputVal
            setTodos(rcd)
            setToggleBtn(true)
            setInputVal('')
        }
    }

    const handleSubmit = (e) => {
        if (e.key == 'Enter' && inputVal.length > 0) {
            if (toggleBtn) {
                handleAdd()
            } else {
                handleUpdate()
            }
        }
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <div className='container'>
            <h1 className='heading'>To Do App</h1>
            <div className="inputField">
                <input type="text" ref={inputRef} onKeyUp={handleSubmit}
                    onChange={(e) => setInputVal(e.target.value)} placeholder='To-do...' value={inputVal} />

                {
                    toggleBtn ? <button onClick={handleAdd}>Add</button> : <button onClick={handleUpdate}>Update</button>
                }

            </div>
            {
                todos.map((todo, i) => {
                    return (
                        <div className='todos' key={i}>
                            <div className='allText'>
                                <input type="checkbox" checked={todo.completed} onChange={(e)=> toggleCheck(todo.id, e.target.checked)} />
                                <p className={`text${todo.completed ? ' checked' : ''}`}>{todo.title}</p>
                            </div>
                            <div className="action">
                                <span className='edit' onClick={() => handleEdit(todo.title, i)}><i className="fa fa-edit"></i></span>
                                <span className='delete' onClick={() => handleDel(i)}><i className="fa fa-trash-o"></i></span>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default App
