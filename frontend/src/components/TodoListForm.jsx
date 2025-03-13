import React, { useState } from 'react';
 
 function TodoListForm() { 
   const [tasks, setTasks] = useState({
     Bedroom: [
       { text: "Bed sheets", isCompleted: false, isImportant: true },
       { text: "Pillow", isCompleted: false, isImportant: true },
       { text: "Blanket", isCompleted: false, isImportant: true },
       { text: "Headboard", isCompleted: false, isImportant: false },
     ],
     'School Supplies': [
       { text: "Notebooks", isCompleted: false, isImportant: true },
       { text: "Pencil case", isCompleted: false, isImportant: true },
       { text: "Laptop", isCompleted: false, isImportant: true },
       { text: "Sticky notes", isCompleted: false, isImportant: false },
     ],
     Bathroom: [
       { text: "Shampoo and conditioner", isCompleted: false, isImportant: true },
       { text: "Hand soap", isCompleted: false, isImportant: true },
       { text: "Soap", isCompleted: false, isImportant: true },
       { text: "Toothbrush and toothpaste", isCompleted: false, isImportant: true },
       { text: "Skincare", isCompleted: false, isImportant: true },
       { text: "Cup", isCompleted: false, isImportant: false },
     ],
     Kitchen: [
       { text: "Bowls", isCompleted: false, isImportant: true },
       { text: "Utensils", isCompleted: false, isImportant: true },
       { text: "Baking powder", isCompleted: false, isImportant: false },
     ],
     Clothing: [
       { text: "Jackets", isCompleted: false, isImportant: true },
       { text: "Sweaters", isCompleted: false, isImportant: true },
       { text: "Jeans", isCompleted: false, isImportant: true },
       { text: "Socks", isCompleted: false, isImportant: true },
       { text: "Sunnies", isCompleted: false, isImportant: false },
     ],
     'Documents/Other': [
       { text: "Student ID", isCompleted: false, isImportant: true },
       { text: "ID", isCompleted: false, isImportant: true },
       { text: "Bus pass", isCompleted: false, isImportant: true },
       { text: "Passport", isCompleted: false, isImportant: false },
     ],
   });
   
   const [newTask, setNewTask] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('Bedroom'); 
 
 
   // add task 
   const addTask = () => {
     if (newTask.trim()) {
       setTasks((prevTasks) => ({
         ...prevTasks,
         [selectedCategory]: [
           ...prevTasks[selectedCategory],
           { text: newTask, isCompleted: false, isImportant: false }
         ]
       }));
       setNewTask('');
     }
   };
 
 
   // completion toggle
   const toggleTaskCompletion = (category, index) => {
     const updatedTasks = {...tasks};
     updatedTasks[category][index].isCompleted = !updatedTasks[category][index].isCompleted;
     setTasks(updatedTasks);
   };
 
   // importance toggle
   const toggleImportance = (category, index) => {
     const updatedTasks = {...tasks};
     updatedTasks[category][index].isImportant = !updatedTasks[category][index].isImportant;
     setTasks(updatedTasks);
   };
   
 
   // delete task
   const removeTask = (category, index) => {
     const updatedTasks = {...tasks};
     updatedTasks[category] = updatedTasks[category].filter((_, taskIndex) => taskIndex !== index);
     setTasks(updatedTasks);
   };
 
   return (
     <div className="p-4 max-w-6xl mx-auto border border-gray-300 rounded-lg shadow-lg">
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
 
       {/* task list by category */} 
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {Object.entries(tasks).map(([category, categoryTasks]) => (
           <div key={category} className="mb-6">
             <h2 className="text-xl font-semibold">{category}</h2>
             <ul>
               {categoryTasks.map((task, index) => (
                 <li
                   key={index}
                   className={`flex items-center justify-between p-2 border-b ${task.isImportant ? 'bg-yellow-100' : ''}`}
                 >
                   <div className="flex items-center gap-3">
                     {/* completion toggle */}
                     <button
                       onClick={() => toggleTaskCompletion(category, index)}
                       className={`w-6 h-6 border-2 rounded-full 
                         ${task.isCompleted ? 'bg-gray-500' : 'bg-transparent'} 
                         ${task.isCompleted ? 'border-gray-500' : 'border-gray-500'} 
                         hover:bg-gray-300`} /// grey hover
                     ></button>
 
                     <span
                       onClick={() => toggleTaskCompletion(category, index)}
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
                       onClick={() => toggleImportance(category, index)}
                       className={`px-2 py-1 rounded ${
                         task.isImportant ? 'bg-yellow-300' : 'bg-gray-300'
                       }`}
                     >
                       {task.isImportant ? '!' : '!'} {/* unmark : important */}
                     </button>
                     
                     <button
                       onClick={() => removeTask(category, index)}
                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                     >
                       Delete
                     </button>
                   </div>
                 </li>
               ))}
             </ul>
           </div>
         ))}
       </div>
     </div>
   );
 }
 
 export default TodoListForm;