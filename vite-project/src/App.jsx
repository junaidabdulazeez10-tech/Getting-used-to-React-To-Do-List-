import { useState } from 'react'
import './App.css'


function App() {
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('all')
  
 
  
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

  function deleteTask(index) {
   const newList = list.filter((value, i) => {
      return index !== value.id
    })
    setList(newList);
  }

  function toggleDone(index) {
    
    const newerList = list.map((value, i) => { 
      if (value.id === index) {
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
      <input type="text" placeholder='Enter Task:' onChange={(e) => {setTask(e.target.value)}} value={task}/>
      <button className="add-btn" onClick={addTask}>Add Task</button>
      <div className='filter'>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
        <button onClick={() => changeFilter('active')}>Active</button>
      </div>
      
      <div>
          {filteredList.map((value, index) => {
            return <div className='task-list' key={value.id}>
              <h3>{value.done === false ? value.text : <del>{value.text}</del>}</h3>
              <button className='delete-btn' onClick={() => deleteTask(value.id)}>Delete</button>
              <button className='state-btn' onClick={() => toggleDone(value.id)}>{value.done === false ? 'Done' : 'Un-Done'}</button>
            </div>
          })}
      </div>
      <h1 className='count'>{completedCount} / {list.length} completed</h1>
    </>
  )
}

export default App
