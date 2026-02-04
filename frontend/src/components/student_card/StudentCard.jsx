import React from "react";
import './student-card.css';
import { User, Mail, Hash } from 'lucide-react';

function StudentCard({ student }) {
  return (
    // <div className="cards">
    <div className="card">
        <Hash size={18} className="icon" />
        <h3>{student.id}</h3>
        <h3>{student.name}</h3>
        <p>{student.email}</p>
    </div>
    // </div>
  );
}

export default StudentCard;