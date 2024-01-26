/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */



import { useState , useEffect } from "react";

function toDoList() {

    const [tasks, setTask] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [newTask, setnewTask] = useState('')
    const [editTask,setEditTask] = useState({index: null,text:''})

   

    useEffect(()=>{
      localStorage.setItem('tasks', JSON.stringify(tasks))
    },[tasks])


    function handleInputChange(event) {

        setnewTask(event.target.value)

    }
    




    function addTask() {

        if (newTask.trim() != "") {
            setTask((t) => [...t, newTask])
            setnewTask('')
        }
    }
    function removeTask(index) {

        
        window.confirm('You want to delete this task')
        const deleteTask = tasks.filter((_, i) => i !== index)
        setTask(deleteTask)

    }

    function startEdit(index,text){
        setEditTask({index,text})
    }

    function cancelEdit() {
        setEditTask({ index: null, text: '' });
      }
    
      function saveEdit() {
        if (editTask.text.trim() !== '') {
          const updatedTasks = tasks.map((task, i) =>
            i === editTask.index ? editTask.text : task
          );
          setTask(updatedTasks);
          cancelEdit();
        }
      }


    return (

        <div className="container">

            <div className="flex justify-center items-center ">
                <h1 className="todolist">Todo List</h1>
            </div>

            <div className="task flex justify-center items-center">
                <input className="input" type="text" placeholder="Enter your task" value={newTask} onChange={handleInputChange}></input>
                <button className="addButton" onClick={addTask}>Add</button>
            </div>


            <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <div className="list flex justify-center justify-between items-center">
              <div className="listContent">
                {editTask.index === index ? (
                  <input
                    type="text"
                    value={editTask.text}
                    onChange={(e) =>
                      setEditTask({ index, text: e.target.value })
                    }
                    className="editInput"
                  />
                ) : (
                  <p className="pl-3">{task}</p>
                )}
              </div>

              <div className="flex">
                {editTask.index !== index ? (
                  <>
                   <button className=" editSaveButton pl-2" onClick={() => startEdit(index, task)}>
                      Edit
                    </button>
                    <button className="editDeleteButton" onClick={() => removeTask(index)}>
                      Delete
                    </button>
                   
                  </>
                ) : (
                  <>
                    <button className="editSaveButton" onClick={saveEdit}>Save</button>
                    <button className="editDeleteButton" onClick={cancelEdit}>Cancel</button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

        </div>


    )

}

export default toDoList