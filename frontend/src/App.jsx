import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import TemplatePage from './pages/TemplatePage.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoListPage from './pages/TodoListPage.jsx'; ///

function App() {
    return (
        <Router>
            <TransitionGroup>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/templates' element={<TemplatePage/>}> </Route>
                <Route path='/create-design' element={<HomePage/>}> </Route>
                <Route path='/login' element={<LogInPage/>}> </Route>
                <Route path='/signup' element={<RegistrationPage/>}> </Route>
                <Route path='/todo-list' element={<TodoListPage/>}> </Route>
            </Routes>
            </TransitionGroup>
        </Router>
    );
}

export default App;