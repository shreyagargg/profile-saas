import React, {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Button from './components/button/Button.jsx';
import Input from './components/input/Input.jsx';
import Card from './components/card/Card.jsx';
import './App.css';

function HeroScreen(){

  const navigate = useNavigate();

  const[teacherId, setTeacherId] = useState("");
  const[teacher, setTeacher] = useState(null);
  const[error, setError] = useState("");

  const handler = async () => {
    try{
      const res = await fetch(`http://localhost:5000/teachers/${teacherId}`);

      if(!res.ok)
        return setError("Teacher not found");

      const data = await res.json();
      setTeacher(data);
      setError("");

      navigate('/card');
    }catch(err){
      console.error(err);
      setError("An error occurred while fetching teacher data");
      setTeacher(null)
      }
  };

  return (
    <Routes>
      <Route path="/" element = {
          <div className="App">
      <h1>Welcome to the SaaS Application</h1>
      <Input value = {teacherId} onChange = {(e) => setTeacherId(e.target.value)}/>
      <Button label = "Login..." onClick = {handler}/>
       {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

      }/>

      <Route
  path="/card"
  element={<Card teacher={teacher} error={error} />}
/>

    </Routes>
  
  )
}

export default HeroScreen;