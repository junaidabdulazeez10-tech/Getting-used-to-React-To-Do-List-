import { useEffect, useState } from 'react'
import './App.css'


function TaskInput({saveTask, addTask, task, setTask, edit}) {
  return (
  <>
    <input type="text" placeholder='Enter Task:' 
      onChange={(e) => {setTask(e.target.value)}} value={task}/>
    <button className="add-btn" onClick={edit ? saveTask : addTask}>
        {edit ? 'Save Task' : 'Add Task'}
    </button>
  </>
  )
}

function TaskItem({deleteTask, editTask, toggleDone, value}){
  return(
    <>
      <h3>{value.done === false ? value.text : <del>{value.text}</del>}</h3>
      <button className='delete-btn' 
        onClick={() => deleteTask(value.id)}>Delete
      </button>
      <button onClick={() => {editTask(value.id, value.text)}}>Edit</button>
      <button className='state-btn' 
        onClick={() => toggleDone(value.id)}>
        {value.done === false ? 'Done' : 'Un-Done'}
      </button>
    </>
  )
}
function TaskList({filteredList, deleteTask, editTask, toggleDone}) {
  return (
    <div>
          {filteredList.map((value) => {
            return <div className='task-list' key={value.id}>
                    <TaskItem 
                      deleteTask={deleteTask} value={value}
                      editTask={editTask} toggleDone={toggleDone}
                    />
                  </div>
          })}
    </div>
  )
}

function FilterButtons({changeFilter}){
  return (
    <div className='filter'>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
        <button onClick={() => changeFilter('active')}>Active</button>
    </div>
  )
}

function App() {
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [edit, setEdit] = useState(null)

  const [list, setList] = useState(() => {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
})

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(list))
  }, [list])


 function editTask(id, text) {
  setEdit(id)
  setTask(text)
 }

 function saveTask() {
  const newerList = list.map((value, index) => {
    if(value.id === edit){
      return {id: value.id , text: task, done: value.done}
      // I can also do this return { ...value, text: task }
    } return value
  })
  setList(newerList)
  setEdit(null)
  setTask('')
 }
  
  function addTask() {
    if(task.trim() === ''){
      alert('You need to fill out the input!')
      return
    }
    setList([...list, {
      id: Date.now(),
      text: task,
      done: false
    }])
    setTask('');
  }

  function deleteTask(id) {
   const newList = list.filter((value, i) => {
      return id !== value.id
    })
    setList(newList);
  }

  function toggleDone(id) {
    
    const newerList = list.map((value, i) => { 
      if (value.id === id) {
          return {id: value.id, text: value.text, done: !value.done}
      } 
      return value
    })
   setList(newerList)
  }

let filteredList = [...list]

  function changeFilter(param) {
    setFilter(param)
  }

    if(filter === 'completed'){
       filteredList = filteredList.filter((value, i) => {
        return value.done;
      })
    }
    if(filter === 'active'){
       filteredList = filteredList.filter((value, i) => {
        return !value.done;
      })
    }


  const completedCount = list.filter((value) => {
    return value.done;
  }).length;

  return (
    <>
      <TaskInput saveTask={saveTask} addTask={addTask} 
      task={task} setTask={setTask} edit={edit}/>
      
      <FilterButtons changeFilter={changeFilter}/>
      
      <TaskList filteredList={filteredList} 
      deleteTask={deleteTask} editTask={editTask} toggleDone={toggleDone}/>

      <h1 className='count'>{completedCount} / {list.length} completed</h1>
    </>
  )
}

export default App
