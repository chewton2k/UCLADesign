import React, { useState } from 'react';

function TodoListForm() { ///update later
  const [tasks, setTasks] = useState([
    { text: "Shampoo and Conditioner", isCompleted: false, isImportant: true},
    { text: "Soap", isCompleted: false, isImportant: true },
    { text: "Towel", isCompleted: false, isImportant: true },
    { text: "Shower Sliders", isCompleted: false, isImportant: true },
    { text: "Bathroom Toiletries", isCompleted: false, isImportant: true },
    { text: "Clothes", isCompleted: false, isImportant: true },
    { text: "Bed Sheets", isCompleted: false, isImportant: true },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('____'); 


  // add task ///need update
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, isCompleted: false, isImportant: false }]);
      setNewTask('');
    }
  };

  // completion toggle
  const toggleTaskCompletion = (category, index) => {
    const updatedTasks = {...tasks};
    updatedTasks[index].isCompleted = !updatedTasks[category][index].isCompleted;
    setTasks(updatedTasks);
  };

  // importance toggle
  const toggleImportance = (category, index) => {
    const updatedTasks = {...tasks};
    updatedTasks[index].isImportant = !updatedTasks[category][index].isImportant;
    setTasks(updatedTasks);
  };
  

  // delete task
  const removeTask = (category, index) => {
    const updatedTasks = {...tasks};
    updatedTasks[category] = updatedTasks[category].filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4 max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      {/* category selector */} 
      <div className="mb-4">
        <label className="block mb-2">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {Object.keys(tasks).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* task input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-grow border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* task list NEED UPDATE */} 
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 border-b ${task.isImportant ? 'bg-yellow-100' : ''}`}
          >
            <div className="flex items-center gap-3">
              {/* completion toggle */}
              <button
                onClick={() => toggleTaskCompletion(index)}
                className={`w-6 h-6 border-2 rounded-full 
                  ${task.isCompleted ? 'bg-gray-500' : 'bg-transparent'} 
                  ${task.isCompleted ? 'border-gray-500' : 'border-gray-500'} 
                  hover:bg-gray-300`} /// grey hover
              ></button>

              <span
                onClick={() => toggleTaskCompletion(index)}
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {task.text}
              </span>
            </div>

            <div className="flex gap-2">
              {/* importance toggle */}
              <button
                onClick={() => toggleImportance(index)}
                className={`px-2 py-1 rounded ${
                  task.isImportant ? 'bg-yellow-300' : 'bg-gray-300'
                }`}
              >
                {task.isImportant ? '!' : '!'} {/* unmark : important */}
              </button>
              
              <button
                onClick={() => removeTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListForm;