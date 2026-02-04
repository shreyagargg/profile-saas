 import React from 'react';
import './card.css';
import Button from '../button/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';
import StudentScreen from '../../Student';

 
 function Card({teacher, error}) { 

    const nav = useNavigate();
     if (error) {
     return <h2 style={{ color: 'red' }}>{error}</h2>;
  }

  if (!teacher) {
    return <h2>No teacher data found</h2>;
  }

  return (
    <Routes>
      <Route path='/card' element = {
    <div className="profile-detail">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        alt="Profile"
        className="profile-image"
      />
      <h1>{teacher.name}</h1>
      <h2>{teacher.email}</h2>
      <Button label="View Students"  onClick={() => nav(`/students/${teacher.id}`)}
      {/* <p>{user.bio}</p>
      <p>{user.city}</p>
      <p>{user.country}</p> */}
    </div>
       } />

       <Route path='/students' element = {
        <StudentScreen teacherid={teacher.id}/>
        // <div>
        //     <h1>Students List</h1>
        // </div>
       } />
    </Routes>
  );
}

export default Card;