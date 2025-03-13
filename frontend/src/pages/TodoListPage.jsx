import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";
import TodoListForm from '../components/TodoListForm';

const TodoListPage = () => {
    return (
        <div>
            <HomePageTop /> 
            <main className="flex-grow"> 
            <div className="min-h-screen bg-gray-100 p-8">
                 <h1 className="text-3xl font-bold text-center mb-6">My To-Do List</h1>
                 <TodoListForm />
            </div>
            </main>
            <HomePageBottom /> 
        </div>
    );
}

export default TodoListPage;