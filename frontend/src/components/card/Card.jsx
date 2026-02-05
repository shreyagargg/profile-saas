import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button.jsx';
import './card.css';

function Card({ teacher, error }) {
  const nav = useNavigate();

  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;
  if (!teacher) return <h2>No teacher data found</h2>;

  return (
    <div className="profile-detail">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        alt="Profile"
        className="profile-image"
      />
      <h1>{teacher.name}</h1>
      <h2>{teacher.email}</h2>
      <Button
        label="View Students"
        onClick={() => nav(`/${teacher.id}/students`)}
      />
    </div>
  );
}

export default Card;
