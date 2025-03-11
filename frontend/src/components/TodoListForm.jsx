import React, { useState } from 'react';

function TodoListForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // add task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, isCompleted: false, isImportant: false }]);
      setNewTask('');
    }
  };

  // completion toggle
  

  // task importance toggle
  

  // delete task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4 max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      {/* Task Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 border-b ${task.isImportant ? 'bg-yellow-200' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span>
                {task.text}
              </span>
            </div>

            <div className="flex gap-2">
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
