/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */



import { useState, useEffect } from "react";

function toDoList() {

  const [tasks, setTask] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [newTask, setnewTask] = useState('')
  const [editTask, setEditTask] = useState({ index: null, text: '' })
  const [currentDay, setCurrentDay] = useState("");


  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    setCurrentDay(dayOfWeek);
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  function handleInputChange(event) {

    setnewTask(event.target.value)

  }

  function addTask() {

    if (newTask.trim() != "") {

      if (!tasks.includes(newTask)) {

        setTask((t) => [...t, newTask])
        setnewTask('')

      } else {
        alert("Task already exists!")
      }

    }
  }
  function removeTask(index) {

    const confirmDelete = window.confirm("Are you sure want to delete this tasks")

    if (confirmDelete) {
      const deleteTask = tasks.filter((_, i) => i !== index)
      setTask(deleteTask)
    }


  }

  function startEdit(index, text) {
    setEditTask({ index, text })
  }

  function cancelEdit() {
    setEditTask({ index: null, text: '' });
  }

  function saveEdit() {

    if (editTask.text.trim() !== '') {
      if (!tasks.slice(0, editTask.index).concat(tasks.slice(editTask.index + 1)).includes(editTask.text)) {

        const updatedTasks = tasks.map((task, i) =>
          i === editTask.index ? editTask.text : task
        );
        setTask(updatedTasks);
        cancelEdit();

      } else {
        alert("Task already exits!")

      }
    }

  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  return (

    <div className="container">

      <div className="flex justify-center items-center ">
        <h1 className="todolist">Todo List</h1>



      </div>
      <div className="days flex justify-center ">
        <h3>{`Welcome , it's ${currentDay} ☕😊`}</h3>

      </div>

      <div className="task flex justify-center items-center">
        <input className="input" type="text" placeholder="Enter your task" value={newTask} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
        <button className="addButton" onClick={addTask}>Add</button>
      </div>


      <ol>
        {tasks.map((tasks, index) => (
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
                  <>
                    <div className="flex">

                      <p className="pl-3">{tasks}</p>
                    </div>

                  </>
                )}
              </div>

              <div className="flex">
                {editTask.index !== index ? (
                  <>
                    <button className=" editSaveButton pl-2" onClick={() => startEdit(index, tasks)}>
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