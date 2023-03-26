
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import "./index.css";
import DropdownLanguage from './dropdownlang';


const lngs = [
  { code: "vn", native: "Vietnamese" },
  { code: "en", native: "English" },

];

function getCurrentDate(){
  const opt = new Date()
  return opt;
};

function objectDate(date){
  const opt = new Date(date);
  return opt
}

function TodoList() {
  const [selectedPriority, setSelectedPriority] = useState("normal");
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [done, setDone] = useState("false");
  const { t, i18n } = useTranslation();
  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };
  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };
  const formatTime = (datetime) => {
    const dateObj = new Date(datetime);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const days = dateObj.getDate();
    const months = dateObj.getMonth();
    const years = dateObj.getFullYear();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}-${days.toString()}/${months.toString()}/${years.toString()}`;
  };




  

  // Load todos from local storage when the component renders
  useMemo(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTasks(storedTodos);
  }, []);

  useEffect(() => {
    console.log('Update!')
    if (tasks !== []){
      localStorage.setItem('todos', JSON.stringify(tasks));
      console.log(tasks);
    }
  }, [tasks]);

  // Save todos to local storage when the page is unloaded

  

  


  const handleSubmit = (event) => {
    
    event.preventDefault();
    setTasks([{ name: taskInput, deadline, done: false, priority: selectedPriority }, ...tasks]);
    
    //localStorage.setItem('todos', JSON.stringify([{ name: taskInput, deadline, done}, ...tasks]));
    setTaskInput("");
    setSelectedPriority("normal");
    
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    //localStorage.setItem('todos', JSON.stringify(newTasks));
  };
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };
  const handleCheck = (index) => {
    
    const newTasks = [...tasks];
    const task = newTasks[index];
    task.done = !task.done;
    if (task.done) {
      newTasks.splice(index, 1);
      newTasks.push(task);
    }
    
    setTasks(newTasks);
    
    
  };
  
  return (
    <><DropdownLanguage /><div className="container">
      <h1>{t('todoTitle')}</h1>
      <form onSubmit={handleSubmit}>
        <input required placeholder={t('inputPlaceholderText')} type="text" value={taskInput} onChange={handleInputChange} />
        <input required type="datetime-local" name="deadline" value={deadline} onChange={handleDeadlineChange} />
        <select value={selectedPriority} onChange={handlePriorityChange}>
          <option value="normal">{t('normal')}</option>
          <option value="high">{t('high')}</option>
          <option value="urgent">{t('urgent')}</option>
        </select>
        <button type="submit">{t('addTask')}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <div key={index} style={
            task.priority === "urgent"
              ? { fontWeight: "bold", color: "red" }
              : task.priority === "high"
              ? { fontWeight: "bold", color: "orange" }
              : {}
          }>
        
        <li
            key={index}
            

          >

            <div className="task-wrapper">
              <label class="taskName" className={
              objectDate(task.deadline) <= getCurrentDate() && !task.done
                ? "disabled"
                : ""
              }>
                <input type="checkbox" class="checkmark" className="checkmark" checked={task.done} onChange={() => handleCheck(index)} />
                &nbsp;
                <span className={task.done ? "done" : ""}>{objectDate(task.deadline)}</span>
                <label className={task.done ? "done" : ""}>&nbsp;</label>
                <span className={task.done ? "done" : ""}>{task.name}</span>
                
              </label>
              
              <span style={{ display: "block",
  position: "relative", fontWeight: "bold", color: "red", padding: 16 px }}>{objectDate(task.deadline) <= getCurrentDate() ? t('deadline') : ""}</span>
              <button onClick={() => handleDelete(index)}>X</button>
            
            </div></li></div>
        ))}
      </ul>
      
    </div></>
  );
}

export default TodoList;
