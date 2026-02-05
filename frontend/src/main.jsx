import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import Card from './components/card/Card.jsx';
import StudentCard from './components/student_card/StudentCard.jsx';
import StudentScreen from './Student.jsx';
import HeroScreen from './HeroScreen.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
