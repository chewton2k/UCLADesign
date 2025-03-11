import React from 'react';
import TodoListForm from '../components/TodoListForm';

function TodoListPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">My To-Do List</h1>
      <TodoListForm />
    </div>
  );
}

export default TodoListPage;
