import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";
import TodoListForm from '../components/TodoListForm';
import CheckList from '../components/Checklist';

const CreateDesignPage = () => {
    return (
        <div>
            <HomePageTop /> 
            <main className="flex-grow"> 
            <div className="min-h-screen bg-gray-100 p-8">
                 <CheckList/> 
            </div>
                {/* Separator for the last section and footer */}
                <div className="py-50"></div>
            </main>
            <HomePageBottom /> 
        </div>
    );
}

export default CreateDesignPage;