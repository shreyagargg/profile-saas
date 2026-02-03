 import React from 'react';
import './card.css';
import Button from '../button/Button';
 
 function Card({teacher, error}) { 
     if (error) {
     return <h2 style={{ color: 'red' }}>{error}</h2>;
  }

  if (!teacher) {
    return <h2>No teacher data found</h2>;
  }

  return (
    <div className="profile-detail">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        alt="Profile"
        className="profile-image"
      />
      <h1>{teacher.name}</h1>
      <h2>{teacher.email}</h2>
      <Button label="View Students" />
      {/* <p>{user.bio}</p>
      <p>{user.city}</p>
      <p>{user.country}</p> */}
    </div>
  );
}

export default Card;