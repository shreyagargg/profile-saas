import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import Card from './components/card/Card.jsx';
import StudentCard from './components/student_card/StudentCard.jsx';
import StudentScreen from './Student.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StudentScreen/>
    </BrowserRouter>
)
