import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "./components/student_card/StudentCard";

function StudentScreen() {
  const { teacherId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);

    fetch(`http://localhost:5000/teachers/${teacherId}/students`)
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [teacherId]);

  if (loading) return <h2>Loading students...</h2>;

  return (
    <div className="cards">
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentScreen;
